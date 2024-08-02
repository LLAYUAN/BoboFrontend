describe('用户常用功能事件流3', function() {
    beforeEach(function() {
        cy.fixture('user').as('userData');
    });

    it('个人空间', function() {
        //登录
        cy.visit('http://localhost:3000/login');
        cy.get('input[placeholder="Email"]').type(this.userData.email);
        cy.get('input[placeholder="Password"]').type(this.userData.password);
        cy.contains('登 入').click();
        cy.url().should('include', '/home');

        //进入个人空间
        cy.get('.ant-btn.ant-btn-circle.ant-btn-primary.ant-btn-icon-only.ant-dropdown-trigger').click();
        cy.contains('个人空间').click();
        cy.url().should('include', '/profile');
        cy.contains('Profile');
        cy.contains('关注');
        cy.contains('粉丝');
        cy.contains('直播回放');
        cy.contains('Create Live');

        //编辑个人信息
        cy.get('input[id="nest-messages_user_name"]').clear().type('changed');
        cy.get('input[id="nest-messages_user_email"]').clear().type('changed@changed.com');

        cy.get('#nest-messages_user_birthday').click();
        cy.contains('Today').click();

        cy.get('textarea[id="nest-messages_user_introduction"]').clear().type('changed');

        // cy.contains('上传头像').click();
        // cy.fixture('example.png', { encoding: null }).as('demo');
        // cy.get('input[type=file]').selectFile('@demo', { force: true });

        cy.contains('Save').click();

        cy.contains('修改成功');
        cy.get('input[id="nest-messages_user_name"]').should('have.value', 'changed');
        cy.get('input[id="nest-messages_user_email"]').should('have.value','changed@changed.com');
        cy.get('textarea[id="nest-messages_user_introduction"]').should('have.value','changed');

        cy.get('input[id="nest-messages_user_email"]').clear().type(this.userData.email);
        cy.contains('Save').click();

        //浏览关注用户
        cy.contains('用户91').click();
        cy.url().should('include', '/visitprofile');
        cy.contains('个人信息');
        cy.contains('直播回放');
        cy.contains('返 回').click();

        //上传视频
        cy.contains('上传视频').click();
        cy.get('input[id="title"]').type('Test Title');
        cy.get('textarea[id="description"]').type('Test Description');

        cy.fixture('example.png', { encoding: null }).as('demo-image');
        cy.get('input[type=file]').eq(1).selectFile('@demo-image', { force: true });

        cy.fixture('example.mp4', { encoding: null }).as('demo-video');
        cy.get('input[type=file]').eq(1).selectFile('@demo-video', { force: true });

        cy.wait(5000);

        cy.contains('上 传').click();
        cy.contains('上传成功');
        cy.contains('Test Title');

        //查看视频
        cy.get('img').eq(2).click();
        cy.url().should('include', '/video');

        //删除视频
        cy.get('.ant-btn.ant-btn-circle.ant-btn-primary.ant-btn-icon-only.ant-dropdown-trigger').click();
        cy.contains('个人空间').click();
        cy.url().should('include', '/profile');
        // cy.get('svg["data-icon="delete"]').click();
        // cy.contains('删除视频');
        // cy.contains('确 认').click();
    });
});
