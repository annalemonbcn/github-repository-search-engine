interface TopicBadgeProps {
  text: string
  url: string
}

const TopicBadge = ({ text, url }: TopicBadgeProps) => {
  return (
    <a 
      href={url}
      className="text-xs text-custom-blue hover:text-white font-bold bg-custom-lightBlue hover:bg-custom-blue rounded-3xl px-2.5 py-1">
        {text}
    </a>
  )
}

export default TopicBadge
