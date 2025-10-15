// src/components/MockBanner/MockBanner.jsx
import styled from "styled-components";
import { USE_MOCK } from "../../services/apiBase";

const Banner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: repeating-linear-gradient(
    -45deg,
    #ffe0e8,
    #ffe0e8 10px,
    #ffc3d3 10px,
    #ffc3d3 20px
  );
  color: #b30041;
  text-align: center;
  font-weight: 700;
  padding: 8px 0;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export default function MockBanner() {
  if (!USE_MOCK) return null;
  return <Banner>🧪 Mock Mode ON — Using local fake data</Banner>;
}
