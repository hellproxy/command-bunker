interface TagsProps {
  tags?: string[];
  className?: string;
  placeholder?: React.ReactElement;
}

export const Tags = ({ tags, className, placeholder }: TagsProps) => {
  return (
    <div className={`flex flex-wrap items-center gap-1 ${className || ""}`}>
      {tags
        ? tags.map((tag, index) => (
            <div key={index} className="px-1.5 py-0.5 border rounded bg-white">
              {tag}
            </div>
          ))
        : placeholder || <></>}
    </div>
  );
};
