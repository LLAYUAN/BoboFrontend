describe('用户常用功能事件流1', function() {
    beforeEach(function() {
        cy.fixture('user').as('userData');
    });

    it('用户登录查看直播流程', function() {
        //登录注册
        cy.visit('http://localhost:3000/register');
        cy.get('input[placeholder="Email"]').type(this.userData.email);
        cy.get('input[placeholder="Password"]').type(this.userData.password);
        cy.get('input[placeholder="Confirm Password"]').type(this.userData.password);
        cy.contains('注 册').click();

        cy.contains('注册成功').should('exist');

        cy.visit('http://localhost:3000/login');
        cy.get('input[placeholder="Email"]').type(this.userData.email);
        cy.get('input[placeholder="Password"]').type(this.userData.password);
        cy.contains('登 入').click();
        cy.url().should('include', '/home');
        cy.contains('成功').should('be.visible');

        //查看导航栏
        cy.visit('http://localhost:3000/home');
        cy.contains('Home').click();
        cy.url().should('include', '/home');
        cy.contains('Recommend for you');

        cy.contains('Popular').click();
        cy.url().should('include', '/popular');

        cy.contains('Category').click();
        cy.url().should('include', '/category');
        cy.contains('学习');
        cy.contains('娱乐');
        cy.contains('其他');

        //查看直播间
        cy.visit('http://localhost:3000/home');
        cy.contains('Popular').click();
        cy.get('.ant-card-body').first().click();

        cy.url().should('include', '/liveUser');
        cy.contains('加入直播间');

        //发送消息
        cy.get('input.ant-input.css-dev-only-do-not-override-kh8544.ant-input-outlined.ant-input-compact-item.ant-input-compact-first-item').type('Hello World!');
        //cy.get('input').type('Hello World!');
        cy.contains('发 送').click();
        cy.contains('Hello World!');

        //关注
        cy.contains('关注').click();
        cy.contains('已关注');

        //退出直播间
        cy.contains('Home').click();
        cy.url().should('include', '/home');

        //退出登录
        cy.get('.ant-btn.ant-btn-circle.ant-btn-primary.ant-btn-icon-only.ant-dropdown-trigger').click();
        cy.contains('退出登录').click();
        cy.contains('你确定要退出登录吗？');
        cy.contains('确 认').click();
        cy.url().should('include', '/login');
    });
});
