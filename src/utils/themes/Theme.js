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
            lightHeaderColor: '#fff',
    }
};

export const GlobalStyles = GlobalTheme => ({
    // ***************************************************************
    // Global Theme
    // ***************************************************************

    cardContainer: {
        width: GlobalTheme.card_contentWidth,
        height: GlobalTheme.card_contentWidth
    },
    loginContainer: {
        width: GlobalTheme.login_contentWidth,
        height: GlobalTheme.login_contentWidth
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
    },

    // ***************************************************************
    // User Theme
    // ***************************************************************

    organizationBG: {
        width: '100%',
        height: '100vh',
        backgroundColor: GlobalTheme.user_styles.lightHeaderColor,
        backgroundImage: 'url("./images/sliderbg_light.jpg")',
        padding: '15px 0px 15px 0px'
    },
    organizationHeader: {
        width: '100%',
        padding: '15px 30px 15px 30px',
        minHeight: '40px',
        display: 'table',
        position: 'fixed',
        zIndex: '1000',
        top: '0',
        left: '0',
        background: GlobalTheme.user_styles.lightHeaderColor,
        borderBottom: '5px solid black'
    },
    organizationFooter: {
        width: '100%',
        padding: '15px 30px 15px 30px',
        minHeight: '40px',
        display: 'table',
        background: GlobalTheme.user_styles.lightHeaderColor,
        borderBottom: '5px solid black'
    },
    header_logo: {
        display: 'block',
        margin: 'auto',

    },
    body_container: {
        width: '100%',
        display: 'table',
        padding: '0px 15px 0px 15px',
        background: 'transparent'
    },
    nav_container: {
        display: 'table',
        width: '100%',
        marginTop: '60px',
        paddingTop: '60px',
        paddingBottom: '25px',
        float: 'left'
    },
    nav_left: {
        width: '50%',
        float: 'left',
        display: 'table'
    },
    nav_right: {
        width: '50%',
        float: 'left',
        display: 'table'
    },
    org_menu_container: {
        float: 'right',
        display: 'table',
        paddingTop: '40px'
    },
    social_menu_container: {
        float: 'left',
        display: 'table',
        paddingTop: '40px',
        paddingLeft: '25px'
    },
    org_menu_item: {
        height: '30px',
        lineHeight: '30px',
        float: 'right',
        color: 'black',
        fontSize: '14px',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px'
    },
    social_menu_item: {
        height: '30px',
        lineHeight: '30px',
        float: 'left',
        color: 'black',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px'
    },
    nav_header: {
        float: 'left',
        display: 'table'
    },
    nav_img: {
        maxWidth: '150px',
        maxHeight: '89px'
    },
    organization_container: {
        width: '100%',
        height: '480px',
        position: 'relative',
        backgroundImage: 'url("http://api.originbeta.net/adminTemplate/1519075843431kc20eieh8417knoy9zfr.jpeg")',
        backgroundSize: 'cover',
        overflow: 'hidden'
    },
    organization_type_container: {
        width: '100%',
        display: 'inline-block',
        height: '50px',
        width: '100%',
        zIndex: '100',
        position: 'absolute',
        top: '0px',
        left: '0px'
    },
    org_type_text: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'left',
        paddingLeft: '30px',
        color: '#fff',
        fontSize: '1.2em'
    },
    powered_by: {
        width: '100%',
        display: 'table',
        padding: '20px 0px 20px 0px',
        textAlign: 'center'
    },
    news_main_container: {
        width: '100%',
        display: 'table'
    },
    section_title_container: {
        width: '70%',
        color: '#565656',
        textAlign: 'left'
    },
    news_container: {
        width: '70%',
        display: 'table',
        marginTop: '10px',
        paddingRight: '15px',
        float: 'left'
    },
    news_item_container: {
        width: '100%',
        height: '286px',
        position: 'relative',
        backgroundColor: 'white',
        color: 'white',
        marginBottom: '4px'
    },
    news_item_body: {
        width: '100%',
        height: '250px',
        paddingTop: '10px',
        position: 'relative',
        backgroundImage: 'url("http://api.originbeta.net/blogMedia/CoD-4-Header.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    },
    news_menu_item: {
        position: 'absolute',
        bottom: '0px',
        width: '100%',
        height: '80px',
        overflow: 'hidden',
        backgroundColor: 'black',
        opacity: '.5',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '10px',
        color: 'white'
    },
    news__more_container: {
        width: '100%',
        height: '36px',
    },
    news_more_button: {
        float: 'right',
        height: '36px',
        backgroundColor: '#fff',
        color: '#000',
        border: '2px solid rgba(0,0,0,.5)',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '2px',
        lineHeight: '36px',
        textAlign: 'center'
    },
    social_news_container: {
        width: '30%',
        display: 'table',
        paddingLeft: '15px',
        paddingTop: '15px',
        float: 'left'
    },
    twitter_container: {
        width: '100%',
        backgroundColor: 'rgb(240, 245, 247)',
        padding: '30px',
        height: '400px',
        display: 'table'
    },
    twitter_bar: {
        width: '40%',
        height: '5px',
        backgroundColor: 'black'
    },
    twitter_title: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        fontSize: '14px'
    },
    recent_matches_container: {
        width: '100%',
        display: 'table'
    },
    recent_matches_body: {
        width: '100%',
        height: '452px',
        backgroundColor: '#2d2f30'
    },
    recent_matches_title: {
        background: 'rgb(83, 191, 235)',
        width: '100%',
        height: '42px',
        lineHeight: '42px',
        paddingLeft: '10px',
        color: '#fff'
    },
    video_main_container: {
        width: '100%',
        display: 'table',
        padding: '60px 70px 40px 70px',
        backgroundColor: 'lightgray',
        marginTop: '20px'
    },
    video_inner_main: {
        width: '100%',
        padding: '0 15px 0 15px'
    },
    small_video_container: {
        width: '100%',
        display: 'table',
        marginTop: '50px'
    },
    small_video: {
        width: '30%',
        float: 'left'
    },
    small_video_middle: {
        width: '30%',
        float: 'left',
        marginLeft: '5%',
        marginRight: '5%'
    },
    orgFooter: {
        margin: '0 auto',
        textAlign: 'center',
        width: '100%',
        background: '#0a9ab4',
        padding: '20px',
    },
    orgFooterText: {
        padding: '0',
        margin: '0',
        fontSize: '16px',
        fontWeight: '400',
        color: '#FFF'
    }


});


