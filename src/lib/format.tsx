export const formatText = (text: string): React.ReactNode => {
  return text.split(/(\([^)]+\))/).map((part, index) => {
    const isUnderlined = part.startsWith('(') && part.endsWith(')');
    const content = isUnderlined ? part.slice(1, -1) : part;

    return isUnderlined ? (
      <u className="underline-offset-4 px-1" key={index}>
        {content}
      </u>
    ) : (
      <span key={index}>{content}</span>
    );
  });
};
