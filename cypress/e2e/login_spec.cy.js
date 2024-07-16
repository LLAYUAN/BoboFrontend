describe('用户登录注册流程', function() {
    beforeEach(function() {
        cy.fixture('user').as('userData');
    });

    it('注册新用户', function() {
        cy.visit('http://localhost:3000/register');
        cy.get('input[placeholder="Email"]').type(this.userData.email);
        cy.get('input[placeholder="Password"]').type(this.userData.password);
        cy.get('input[placeholder="Confirm Password"]').type(this.userData.password);
        cy.contains('注 册').click();

        cy.contains('注册成功').should('exist');
    });

    it('注册两次密码不一致', function() {
        cy.visit('http://localhost:3000/register');
        cy.get('input[placeholder="Email"]').type(this.userData.email);
        cy.get('input[placeholder="Password"]').type(this.userData.password);
        cy.get('input[placeholder="Confirm Password"]').type(this.userData.password + '1');
        cy.contains('注 册').click();
        cy.contains('两次输入密码不一致').should('be.visible');
    });

    it('注册重复', function() {
        cy.visit('http://localhost:3000/register');
        cy.get('input[placeholder="Email"]').type(this.userData.email);
        cy.get('input[placeholder="Password"]').type(this.userData.password);
        cy.get('input[placeholder="Confirm Password"]').type(this.userData.password);
        cy.contains('注 册').click();
        cy.contains('该用户已存在').should('be.visible');
    });

    it('登录', function() {
        cy.visit('http://localhost:3000/login');
        cy.get('input[placeholder="Email"]').type(this.userData.email);
        cy.get('input[placeholder="Password"]').type(this.userData.password);
        cy.contains('登 入').click();
        cy.url().should('include', '/home');
        cy.contains('成功').should('be.visible');
    });

    it('登录密码错误', function() {
        cy.visit('http://localhost:3000/login');
        cy.get('input[placeholder="Email"]').type(this.userData.email);
        cy.get('input[placeholder="Password"]').type(this.userData.password + '1');
        cy.contains('登 入').click();
        cy.contains('邮箱或密码错误').should('be.visible');
    });
});
