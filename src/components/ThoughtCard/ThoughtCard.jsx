import { Card, Text, Footer, HeartBtn, Count, Time } from "./ThoughtCard.styles";

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return `${diff} second${diff === 1 ? "" : "s"} ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  return `${h} hour${h === 1 ? "" : "s"} ago`;
}

export default function ThoughtCard({ message, hearts, createdAt, onHeart, disabled = false }) {
  return (
    <Card className="card">
      <Text>{message}</Text>
      <Footer>
        <HeartBtn
          type="button"
          onClick={onHeart}
          aria-label="Send heart"
          disabled={disabled}
          $active={hearts > 0}   // 👈 drives fill color
        >
          <span aria-hidden>❤️</span>
        </HeartBtn>
        <Count>x {hearts}</Count>
        <Time dateTime={new Date(createdAt).toISOString()}>{timeAgo(createdAt)}</Time>
      </Footer>
    </Card>
  );
}
