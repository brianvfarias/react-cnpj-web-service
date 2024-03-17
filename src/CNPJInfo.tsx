interface CNPJInfoProps {
  CNPJResponse: string;
}

export function CNPJInfo({ CNPJResponse }: CNPJInfoProps) {
  return (
    <textarea disabled>
      {CNPJResponse}
    </textarea>
  )
}
