import React from 'react';
import { render } from '@testing-library/react';
import { PostsPage } from '../pages/PostsPage';

jest.mock('../components/PostsListPage', () => ({
  PostsListPage: () => <div data-testid="posts-list-page">PostsListPage</div>
}));
jest.mock('../components/RankingContainer', () => ({
  RankingContainer: () => <div data-testid="ranking-container">RankingContainer</div>
}));

describe('PostsPage', () => {
  it('renders PostsPage component', () => {
    const { getByTestId } = render(<PostsPage addedPost={false} setAddedPost={() => {}} />);

    expect(getByTestId('posts-list-page')).toBeInTheDocument();
    expect(getByTestId('ranking-container')).toBeInTheDocument();
  });
});
