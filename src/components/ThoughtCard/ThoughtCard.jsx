// src/components/ThoughtCard/ThoughtCard.jsx
import {
  Card,
  Text,
  Footer,
  HeartBtn,
  Count,
  Time,
  Author,
  Actions,
  ActionButton,
  EditInput,
} from "./ThoughtCard.styles";

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return `${diff} second${diff === 1 ? "" : "s"} ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  return `${h} hour${h === 1 ? "" : "s"} ago`;
}

/**
 * Props:
 *  - message, hearts, createdAt, author
 *  - onHeart, disabled
 *  - canEdit (boolean)
 *  - onEdit, onDelete
 *  - isEditing (optional)
 *  - editValue, onEditChange, onEditSave, onEditCancel (optional)
 *
 * You already use: message, hearts, createdAt, author, onHeart, disabled, canEdit, onEdit, onDelete.
 * The edit-field props are optional – if you don’t pass them, input won’t show.
 */
export default function ThoughtCard({
  message,
  hearts,
  createdAt,
  author,
  onHeart,
  disabled = false,
  canEdit = false,
  onDelete,
  onEdit,
  isEditing = false,
  editValue = "",
  onEditChange,
  onEditSave,
  onEditCancel,
}) {
  const isActive = hearts > 0;

  return (
    <Card className="card">
      <Text>{message}</Text>

      {author && (
        <Author>
          {author}
        </Author>
      )}

      {/* Inline edit field – only if parent passes isEditing=true */}
      {isEditing && (
        <EditInput
          value={editValue}
          onChange={(e) => onEditChange?.(e.target.value)}
          aria-label="Edit your thought"
        />
      )}

      <Footer>
        <HeartBtn
          type="button"
          onClick={onHeart}
          aria-label="Send heart"
          disabled={disabled}
          $active={isActive}
        >
          <span aria-hidden>❤️</span>
        </HeartBtn>

        <Count>x {hearts}</Count>

        <Time dateTime={new Date(createdAt).toISOString()}>
          {timeAgo(createdAt)}
        </Time>

        {canEdit && (
          <Actions>
            {onEdit && !isEditing && (
              <ActionButton type="button" onClick={onEdit}>
                Edit
              </ActionButton>
            )}
            {isEditing && (
              <>
                {onEditSave && (
                  <ActionButton type="button" onClick={onEditSave}>
                    Save
                  </ActionButton>
                )}
                {onEditCancel && (
                  <ActionButton type="button" onClick={onEditCancel}>
                    Cancel
                  </ActionButton>
                )}
              </>
            )}
            {onDelete && (
              <ActionButton type="button" onClick={onDelete}>
                Delete
              </ActionButton>
            )}
          </Actions>
        )}
      </Footer>
    </Card>
  );
}
