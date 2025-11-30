#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../src/data/projects');
const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));

// Violation categories
const violations = {
  noCategory: [],
  noGithub: [],
  modelWeights: [],
  tutorials: [],
  mcpPlugins: [],
  awesomeLists: [],
  genericInfra: [],
  invalidCategory: [],
  cloudVendorSpecific: []
};

const validCategories = ['Inference', 'Training', 'RAG', 'Agent', 'AI Infra'];

// Keywords for detection
// Cloud vendor/platform keywords
const cloudVendorKeywords = [
  'aws', 'azure', 'gcp', 'alibaba', 'baidu', 'tencent', 'jdcloud', 'volcengine', 'bytedance', 'huawei', 'oracle', 'ibm', 'salesforce', 'snowflake', 'databricks', 'vertexai', 'bedrock', 'sagemaker', 'openai', 'anthropic', 'google', 'huggingface', 'langchain', 'llamaindex'
];
const modelKeywords = ['llama', 'qwen', 'mistral', 'yi-', 'gemma', 'model-card', 'weights', 'checkpoint'];
const tutorialKeywords = ['awesome', 'tutorial', 'course', 'guide', 'learning', 'handbook', 'book'];
const mcpKeywords = ['mcp-', '-mcp', 'model-context-protocol'];
const genericInfraKeywords = ['kubernetes', 'istio', 'envoy', 'knative', 'prometheus'];

files.forEach(file => {
  const content = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
  
  // Extract frontmatter fields
  const titleMatch = content.match(/^title:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '');
  
  const categoryMatch = content.match(/^category:\s*(.+)$/m);
  const category = categoryMatch ? categoryMatch[1].trim() : null;
  
  const githubMatch = content.match(/^github:\s*['"](.+?)['"]$/m);
  const github = githubMatch ? githubMatch[1].trim() : '';
  
  const descMatch = content.match(/^description:\s*[>|-]?\s*(.+)$/m);
  const description = descMatch ? descMatch[1].trim() : '';
  
  const tagsMatch = content.match(/^tags:\s*\n((?:  - .+\n)+)/m);
  const tags = tagsMatch ? tagsMatch[1].split('\n').map(t => t.trim().replace(/^- /, '')).filter(Boolean) : [];
  
  const project = { file, title, category, github, description, tags };
    // 7. Cloud vendor/platform specific
    const allText = `${title} ${description} ${file} ${github} ${tags.join(' ')}`.toLowerCase();
    if (cloudVendorKeywords.some(kw => allText.includes(kw))) {
      violations.cloudVendorSpecific.push(project);
    }
  
  // Check for violations
  
  // 1. No category or invalid category
  if (!category) {
    violations.noCategory.push(project);
  } else if (!validCategories.includes(category)) {
    violations.invalidCategory.push(project);
  }
  
  // 2. No GitHub URL
  if (!github || github === '') {
    violations.noGithub.push(project);
  }
  
  // 3. Model weights (check title, description, file name)
  const textToCheck = `${title} ${description} ${file}`.toLowerCase();
  if (modelKeywords.some(kw => textToCheck.includes(kw))) {
    violations.modelWeights.push(project);
  }
  
  // 4. Tutorials/Awesome lists
  if (tutorialKeywords.some(kw => textToCheck.includes(kw))) {
    violations.tutorials.push(project);
  }
  
  // 5. MCP plugins
  if (mcpKeywords.some(kw => textToCheck.includes(kw)) && 
      !title.toLowerCase().includes('server') && 
      !title.toLowerCase().includes('sdk') &&
      !title.toLowerCase().includes('runtime')) {
    violations.mcpPlugins.push(project);
  }
  
  // 6. Generic infrastructure
  if (genericInfraKeywords.some(kw => textToCheck.includes(kw)) &&
      category === 'AI Infra') {
    violations.genericInfra.push(project);
  }
});

// Generate report
console.log('=== PROJECT VIOLATION REPORT ===\n');
console.log(`Total projects scanned: ${files.length}\n`);

let totalViolations = 0;
Object.entries(violations).forEach(([type, projects]) => {
  totalViolations += projects.length;
});

console.log(`Total violations found: ${totalViolations}\n`);
console.log('=== VIOLATION BREAKDOWN ===\n');

Object.entries(violations).forEach(([type, projects]) => {
  if (projects.length > 0) {
    const labels = {
      noCategory: 'No Category Assigned',
      noGithub: 'No GitHub URL',
      modelWeights: 'Potential Model Weights',
      tutorials: 'Potential Tutorials/Awesome Lists',
      mcpPlugins: 'Potential MCP Plugins',
      awesomeLists: 'Awesome Lists',
      genericInfra: 'Generic Infrastructure',
      invalidCategory: 'Invalid Category',
      cloudVendorSpecific: 'Cloud/Platform Specific'
    };
    
    console.log(`\n## ${labels[type]} (${projects.length})\n`);
    projects.slice(0, 15).forEach(p => {
      console.log(`- ${p.title}`);
      console.log(`  File: ${p.file}`);
      if (p.category) console.log(`  Category: ${p.category}`);
      if (p.github) console.log(`  GitHub: ${p.github}`);
      console.log('');
    });
    
    if (projects.length > 15) {
      console.log(`  ... and ${projects.length - 15} more\n`);
    }
  }
});

// Save detailed report to JSON
const report = {
  timestamp: new Date().toISOString(),
  totalProjects: files.length,
  totalViolations,
  violations
};

fs.writeFileSync(
  path.join(__dirname, 'violation-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n=== SUMMARY ===\n');
console.log(`Detailed report saved to: scripts/violation-report.json`);
console.log(`\nRecommendation: Review the violations and create a removal list.`);
