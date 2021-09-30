import unescape from 'lodash.unescape';

export const extractStringFromTree = (props: any): string | null => {
  if (props.children) {
    const firstChild = props.children[0];

    if (typeof firstChild === 'string') {
      return firstChild;
    } else {
      return extractStringFromTree(firstChild.props);
    }
  }
  return null;
};

export const stringToCssId = (string: string): string => {
  return string
    .replace(/\W+/g, ' ')
    .trim()
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('-');
};

export const cleanupMarkdownHeading = (heading: string): string => {
  heading = heading.replace(/#+/, '').trim();
  heading = heading.replace(/\*{2,}/g, '');
  heading = heading.replace(/\\\(/g, '(');
  heading = heading.replace(/\\\)/g, ')');
  heading = heading.replace(/( |<([^>]+)>)/g, ' ');
  heading = unescape(heading);
  return cleanupStringFromMarkdown(heading);
};

export const cleanupStringFromMarkdown = (string: string): string => {
  string = string.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, '');
  return string;
};
