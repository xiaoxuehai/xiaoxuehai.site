'use client';
import type { MDXComponents } from 'mdx/types';

import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import { Pre } from './Pre';
export interface MDXContentProps {
  code: string;
}
const components: MDXComponents = {
  //   img: NextImage,
  pre: ({ children, ...rest }) => {
    const className = children?.props?.className;
    const lang = className?.replace('language-', '');
    return (
      <Pre {...rest} lang={lang}>
        {children}
      </Pre>
    );
  },
};

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <Component components={components} />;
}
