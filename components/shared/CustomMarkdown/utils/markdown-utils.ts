export type GitbookHintType = 'info' | 'danger' | 'working' | 'tip';

export const gitbookHintTypeToAntd = (gitBookType: GitbookHintType): string => {
  let type = 'info';

  if (gitBookType === 'danger') {
    type = 'error';
  } else if (gitBookType === 'working') {
    type = 'success';
  } else if (gitBookType === 'tip') {
    type = 'warning';
  }
  return type;
};
