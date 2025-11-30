declare module '*.mdx' {
  import { ComponentType } from 'react';
  
  interface MDXProps {
    components?: Record<string, ComponentType<any>>;
  }
  
  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
  
  export const frontmatter: Record<string, any>;
}

declare module '*.md' {
  import { ComponentType } from 'react';
  
  interface MDXProps {
    components?: Record<string, ComponentType<any>>;
  }
  
  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
  
  export const frontmatter: Record<string, any>;
}
