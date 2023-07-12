import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { NewBlogForm } from '../components/NewBlogForm'

test('Test creating blog form, ', async () => {
    const mockSetBlogs = jest.fn()
    const mockTestSubmit = jest.fn()
    const user = userEvent.setup()

    render(<NewBlogForm setMessage={() => { }} setBlogs={mockSetBlogs} setError={() => { }} createBlogRef={() => { }} testSubmit={mockTestSubmit} />)

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('URL')
    const createButton = screen.getByText('Create New Blog')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test url')
    await user.click(createButton)

    expect(mockTestSubmit.mock.calls).toHaveLength(1)
})