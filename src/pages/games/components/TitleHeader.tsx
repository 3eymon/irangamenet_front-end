type TitleHeaderProps = {
  title: string;
};

export default function TitleHeader({ title }: TitleHeaderProps) {
  return <h2 className="text-2xl font-PeydaMed">{title}</h2>;
}
