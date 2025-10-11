import { SpinnerWrap } from "./Loader.styles";

export default function Loader({ show }) {
  if (!show) return null;
  return (
    <SpinnerWrap role="status" aria-label="Loading">
      <div />
    </SpinnerWrap>
  );
}
