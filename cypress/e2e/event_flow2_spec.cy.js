describe('用户常用功能事件流2', function() {
    beforeEach(function() {
        cy.fixture('user').as('userData');
    });

    it('进行直播', function() {
        cy.visit('http://localhost:3000/login');
        cy.get('input[placeholder="Email"]').type(this.userData.email);
        cy.get('input[placeholder="Password"]').type(this.userData.password);
        cy.contains('登 入').click();
        cy.url().should('include', '/home');

        cy.contains('我要直播').click();
        cy.contains('创建直播间');
        cy.get('input[id="title"]').type('Test Title');
        //选择分类
        cy.get('.ant-select').click();

            cy.contains('.ant-select-item-option-content', '学习').click({ force: true });
            cy.contains('.ant-select-item-option-content', '娱乐').click({ force: true });
            cy.contains('.ant-select-item-option-content', '其他').click({ force: true });


        //上传图片
        cy.fixture('example.png', { encoding: null }).as('demo');
        cy.get('input[type=file]').selectFile('@demo', { force: true });

        cy.contains('创 建').click();

        //开始直播
        cy.url().should('include', '/liveAnchor');
    });
});
