/* eslint-disable */


export const GlobalTheme = {
    colorPrimary: 'green',
    signupHeaderColor: '#fff',
    login_contentWidth: '840px',
    login_contentHeight: '300px',
    signup_contentWidth: '100%',
    signup_contentHeight: '100%',
    card_contentWidth: '640px',
    card_contentHeight: '800px',
    user_styles: {
        user_test_width: '200px',
    }
};

export const GlobalStyles = GlobalTheme => ({
    cardContainer: {
        width: GlobalTheme.card_contentWidth,
        height: GlobalTheme.card_contentWidth
    },
    loginContainer: {
        width: GlobalTheme.login_contentWidth,
        height: GlobalTheme.login_contentWidth
    },
    someUserSpecificStyle: {
        width: GlobalTheme.user_styles.user_test_width
    },
    signupContainer: {
        width: GlobalTheme.signup_contentWidth,
        height: GlobalTheme.signup_contentWidth,
        fontFamily: '"Orbitron", sans-serif !important'
    },
    signupHeader: {
        backgroundColor: GlobalTheme.signupHeaderColor,
        padding: '15px'
    },
    signupBGImage: {
        backgroundImage: 'url("./images/login-bg.jpg")',
        width: '100%',
        height: '100vh',
        display: 'table',
        paddingBottom: '80px'
    },
    signupFooter: {
        position: 'fixed',
        margin: '0 auto',
        textAlign: 'center',
        width: '100%',
        background: '#0a9ab4',
        padding: '20px',
        left: '0',
        right: '0',
        zIndex: '9999',
        bottom: '0'
    },
    signupFooterText: {
        padding: '0',
        margin: '0',
        fontSize: '16px',
        fontWeight: '400',
        color: '#FFF'
    },
    signupModal: {
        backgroundColor: 'rgba(0,0,0,.25)',
        borderRadius: '15px',
        width: '45%',
        marginTop: '40px',
        display: 'table',
        paddingBottom: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    tabular_menu: {
        width: '100%',
        height: '54px',
        display: 'table' 
    },
    tabular_menu_item: {
        width: '50%',
        height: '54px',
        lineHeight: '54px',
        backgroundColor: 'rgb(40,40,40)',
        textAlign: 'center',
        fontSize: '1.75em',
        float: 'left',
        color: 'rgb(85,85,85)',
        borderRadius: '6px 6px 0 0',
        cursor: 'pointer'
    },
    tabular_menu_item_active: {
        width: '50%',
        height: '54px',
        lineHeight: '54px',
        backgroundColor: 'rgb(102,102,102)',
        fontSize: '1.75em',
        textAlign: 'center',
        float: 'left',
        color: '#fff',
        borderRadius: '6px 6px 0 0',
        cursor: 'pointer'
    },
    signupModalContent: {
        width: '100%',
        paddingLeft: '15px',
        paddingRight: '15px'
    },
    form_body: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    input_box: {
        display: 'block',
        width: '100%',
        color: '#FFF',
        height: '45px',
        padding: '15px',
        fontSize: '14px',
        lineHeight: '15px',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        borderWidth: '2px',
        borderColor: '#fff',
        borderStyle: 'solid',
        borderRadius: '5px'
    },
    input_title: {
        width: '100%',
        marginBottom: '10px',
        marginTop: '10px',
        color: '#fff',
        fontSize: '16px'
    },
    submit_button: {
        width: '100%',
        height: '1em',
        background: '#0a9ab4',
        fontSize: '18px'
    },
    submit_outer_divider: {
        width: '100%',
        paddingLeft: '15px',
        paddingRight: '15px',
        marginTop: '5px',
        marginBottom: '5px'
    },
    submit_divider: {
        width: '100%',
        height: '1px',
        background: 'rgba(255,255,255,.9)',
        marginTop: '20px',
        marginBottom: '15px'
    },
    submit_or: {
        width: '100%',
        textAlign: 'center',
        fontSize: '14px',
        color: '#fff'
    },
    social_box_outer: {
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px'
    },
    social_box_inner: {
        width: '50%',
        float: 'left'
    },
    social_box_left: {
        float: 'right',
        textAlign: 'center',
        fontSize: '12px',
        width: '60px',
        color: '#fff'
    },
    social_box_right: {
        float: 'left',
        textAlign: 'center',
        fontSize: '12px',
        width: '60px',
        color: '#fff'
    },
    social_image_box: {
        width: '45px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    social_text_box: {
        width: '100%',
        textAlign: 'center',
    }
});




// user themes


export const UserTheme = {
    testFontSize: '19px'
};

export const UserStyles = UserTheme => ({
    testStyle: {
        fontSize: UserTheme.testFontSize
    }
});

