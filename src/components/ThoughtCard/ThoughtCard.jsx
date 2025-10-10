import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  background: #fff;
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  max-width: 80%;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 12px;
  line-height: 1.4;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #999;
  text-align: right;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & span {
    margin-top: 4px;
    font-size: 14px;
    color: #333;
  }
`;

function ThoughtCard({ thought, onLike }) {
  return (
    <Card>
      <Content>
        <Message>{thought.message}</Message>
        <Meta>{new Date(thought.createdAt).toLocaleTimeString()}</Meta>
      </Content>
      <HeartButton onClick={onLike}>
        ❤️
        <span>x {thought.hearts}</span>
      </HeartButton>
    </Card>
  );
}

ThoughtCard.propTypes = {
  thought: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    hearts: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
};

export default ThoughtCard;