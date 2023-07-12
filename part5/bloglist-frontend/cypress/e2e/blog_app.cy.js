/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'testuser',
      password: 'password',
      name: 'Test User'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#username-input')
    cy.get('#password-input')
  })

  describe('Login', function () {
    it('succeeded with correct credentials', function () {
      cy.get('#username-input').type('testuser')
      cy.get('#password-input').type('password')
      cy.contains('Login').click()
      cy.contains('testuser logged in')
      cy.contains('Log out')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('wronguser')
      cy.get('#password-input').type('wrongpassword')
      cy.contains('Login').click()
      cy.contains('Wrong credentials')
    })

  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testuser', password: 'password'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#createblog-title').type('cypressblog')
      cy.get('#createblog-author').type('cypressauthor')
      cy.get('#createblog-url').type('https://cypressblog.com')
      cy.get('.create-button').click()
      cy.contains('a new blog cypressblog by cypressauthor created')
    })
  })

  describe('When logged in and blog created', function () {
    beforeEach(function () {
      // create a new user
      const user = {
        username: 'testuser2',
        password: 'password2',
        name: 'Test User'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.login({ username: 'testuser', password: 'password' })
      cy.createBlog({ title: 'cypressblog', author: 'cypressauthor', url: 'https://cypressblog.com' })
    })

    it('User can like the blog', function () {
      cy.get('.toggle-details').first().click()
      cy.get('#likes').contains('0')
      cy.get('.like-button').click()
      cy.get('#likes').contains('1')
    })

    it('User can delete the blog they created', function () {
      cy.get('.toggle-details').first().click()
      cy.get('.delete-button').first().click()
      cy.contains('Blog cypressblog was deleted successfully')
    })

    it('Only the user that created the blog can see delete button', function () {
      cy.contains('Log out').click({ force: true })
      cy.login({ username: 'testuser2', password: 'password2' })
      cy.get('.toggle-details').click()
      cy.get('button').not('.delete-button')
    })
  })

  describe('Blogs are sorted from most liked to least liked', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'password' })
      cy.createBlog({ title: 'cypressblog1', author: 'cypressauthor1', url: 'https://cypressblog1.com' })
      cy.createBlog({ title: 'cypressblog2', author: 'cypressauthor2', url: 'https://cypressblog2.com' })
      cy.createBlog({ title: 'cypressblog3', author: 'cypressauthor3', url: 'https://cypressblog3.com' })
    })

    it('The most liked blog is first and least liked last', function () {

      cy.get('.blog').get('.toggle-details').click({ multiple: true })
      cy.get('.blog').get('.like-button').eq(1).click({ multiple: true })
      cy.get('.blog').get('.like-button').eq(1).click({ multiple: true })
      cy.get('.blog').get('.like-button').eq(1).click({ multiple: true })

      cy.wait(1000)

      cy.get('.blog').get('.like-button').eq(2).click({ multiple: true })
      cy.get('.blog').get('.like-button').eq(2).click({ multiple: true })

      cy.wait(1000)
      cy.get('.blog').get('.like-button').eq(0).click({ multiple: true })

      cy.wait(1000)

      cy.get('.blog').eq(1).contains('cypressblog3 - cypressauthor3')
      cy.get('.blog').eq(2).contains('cypressblog1 - cypressauthor1')
      cy.get('.blog').eq(0).contains('cypressblog2 - cypressauthor2')

    })
  })
})