
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const PROJECTS_DIR = path.join(process.cwd(), 'src/data/projects');

// Rules from docs/oss-rule.md
const CATEGORIES = [
  'Inference',
  'Training',
  'RAG',
  'Agent',
  'AI Infra'
] as const;

const ALLOWED_TAGS = new Set([
  // Technical
  'inference', 'training', 'finetune', 'quantization', 'embedding', 'retriever', 
  'reranker', 'vector-db', 'agent-runtime', 'agent-framework', 'graph-routing', 
  'dataset-engine', 'feature-store', 'observability', 'benchmarking', 'distributed', 
  'multimodal', 'serving', 'pipeline', 'orchestration', 'safety', 'evaluation',
  // Ecosystem/Lang
  'python', 'go', 'rust', 'javascript', 'wasm', 'cloud-native', 'kubernetes', 
  'ray', 'ollama', 'huggingface-ecosystem', 'openai-ecosystem'
]);

// Mapping for auto-categorization based on tags/keywords
const CATEGORY_MAPPING: Record<string, string[]> = {
  'Inference': ['inference', 'serving', 'quantization', 'vllm', 'tgi', 'tensorrt'],
  'Training': ['training', 'finetune', 'peft', 'lora', 'distributed', 'deepspeed'],
  'RAG': ['rag', 'vector-db', 'embedding', 'retriever', 'reranker', 'milvus', 'qdrant', 'chroma'],
  'Agent': ['agent', 'agent-runtime', 'agent-framework', 'orchestration', 'langchain', 'llamaindex'],
  'AI Infra': ['infra', 'gpu', 'scheduler', 'model-registry', 'ray', 'kubeflow']
};

// Exclusion keywords (simple check)
const EXCLUSION_KEYWORDS = [
  'awesome', 'tutorial', 'course', 'learning', 'cheatsheet', 'roadmap', 
  'interview', 'demo', 'example', 'notebook'
];

// Specific exclusion list from rules (partial implementation)
// 1. Model weights (LLaMA, Qwen, etc. - hard to detect by name alone without list, but we can check description)
// 2. Tutorials/Courses
// 3. Commercial/Closed source (hard to detect automatically)
// 4. Awesome lists

function cleanProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error(`Projects directory not found: ${PROJECTS_DIR}`);
    return;
  }

  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.md'));
  let deletedCount = 0;
  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(PROJECTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: markdownContent } = matter(content);

    // 1. Filter based on exclusion rules
    const lowerTitle = (data.title || '').toLowerCase();
    const lowerDesc = (data.description || '').toLowerCase();
    const lowerSlug = (data.slug || file.replace('.md', '')).toLowerCase();
    
    // Check for exclusion keywords
    if (EXCLUSION_KEYWORDS.some(k => lowerTitle.includes(k) || lowerSlug.includes(k))) {
        // Double check if it's a "framework" or "tool" to avoid false positives like "awesome-llm-tool"
        if (!lowerDesc.includes('framework') && !lowerDesc.includes('library') && !lowerDesc.includes('tool') && !lowerDesc.includes('sdk')) {
             console.log(`[DELETE] ${file} - Matches exclusion keyword`);
             fs.unlinkSync(filePath);
             deletedCount++;
             return;
        }
    }

    // Check for model weights (heuristic)
    if (lowerTitle.includes('llama') && (lowerTitle.includes('7b') || lowerTitle.includes('13b') || lowerTitle.includes('model'))) {
         // This is risky, but let's try to be conservative. 
         // If it doesn't look like a tool (no "inference", "serving", "framework"), delete it.
         if (!lowerDesc.includes('inference') && !lowerDesc.includes('serving') && !lowerDesc.includes('framework')) {
             console.log(`[DELETE] ${file} - Likely model weights`);
             fs.unlinkSync(filePath);
             deletedCount++;
             return;
         }
    }

    // 2. Assign Category
    let category = data.category;
    if (!category || !CATEGORIES.includes(category)) {
      // Auto-detect category
      const allText = (lowerTitle + ' ' + lowerDesc + ' ' + (data.tags || []).join(' ')).toLowerCase();
      
      for (const [cat, keywords] of Object.entries(CATEGORY_MAPPING)) {
        if (keywords.some(k => allText.includes(k))) {
          category = cat;
          break;
        }
      }
      
      // Default to AI Infra if unsure but looks like infra, or just pick one based on best guess
      // If still null, we might need to flag it or default to something. 
      // For now, let's default to 'AI Infra' if it contains 'cloud' or 'deploy', otherwise 'Agent' if 'bot' etc.
      if (!category) {
          if (allText.includes('cloud') || allText.includes('deploy') || allText.includes('server')) category = 'AI Infra';
          else if (allText.includes('bot') || allText.includes('chat')) category = 'Agent';
          else if (allText.includes('search') || allText.includes('data')) category = 'RAG';
          else category = 'AI Infra'; // Fallback
      }
    }
    
    // 3. Standardize Tags
    let tags = (data.tags || []).map((t: string) => t.toLowerCase().replace(/\s+/g, '-'));
    
    // Filter tags
    tags = tags.filter((t: string) => ALLOWED_TAGS.has(t));
    
    // Add category-specific tags if missing
    if (category === 'Inference' && !tags.includes('inference')) tags.push('inference');
    if (category === 'Training' && !tags.includes('training')) tags.push('training');
    if (category === 'RAG' && !tags.includes('rag')) tags.push('rag');
    // etc.

    // Deduplicate
    tags = [...new Set(tags)];

    // Update frontmatter
    data.category = category;
    data.tags = tags;

    // Write back
    const newContent = matter.stringify(markdownContent, data);
    fs.writeFileSync(filePath, newContent);
    updatedCount++;
    console.log(`[UPDATE] ${file} - Category: ${category}, Tags: ${tags.length}`);
  });

  console.log(`\nCleanup Complete.`);
  console.log(`Deleted: ${deletedCount}`);
  console.log(`Updated: ${updatedCount}`);
}

cleanProjects();
