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
    choiceModal: {
        width: '50%',
        marginTop: '25%',
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
    // New Dark Theme
    // ***************************************************************

    dark_mobile_menu: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'rgb(20,20,20)'
    },
    dark_mobile_menu_item: {
        width: '100%',
        height: '50px',
        color: 'white',
        lineHeight: '50px',
        paddingLeft: '15px',
        borderWidth: '1px',
        borderColor: 'rgb(30,30,30)',
        borderStyle: 'solid',
        cursor: 'pointer'
    },
    dark_mobile_menu_item_box: {
        width: '100%',
        height: '50px',
        color: 'white',
        lineHeight: '50px',
        paddingLeft: '15px'
    },
    dark_news_title: {
        fontWeight: '600',
        textAlign: 'left',
    },
    dark_news_date: {
        fontWeight: '400',
        fontSize: '12px',
        textAlign: 'right',
        float: 'right'
    },
    dark_nav_container: {
        display: 'table',
        width: '100%',
        height: '50px',
        marginTop: '40px',
        paddingTop: '60px',
        paddingBottom: '0px'
    },
    dark_nav_left: {
        width: '100%',
        height: '50px',
        display: 'table',
        paddingLeft: '30px'
    },
    dark_nav_right: {
        width: '100%',
        height: '50px',
        display: 'table',
        paddingRight: '30px'
    },
    dark_nav_center: {
        width: '100%',
        height: '50px',
        display: 'table'
    },
    dark_nav_header: {
        display: 'table',
        height: '50px',
        width: '100%',
        textAlign: 'center'
    },
    dark_nav_img: {
        maxWidth: '100px',
        maxHeight: '50px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    dark_mobile_nav_container: {
        width: '100%',
        height: '20px',
        background: 'black'
    },
    dark_mobile_nav_left: {
        width: '50%',
        height: '20px',
        float: 'left',
        paddingLeft: '15px',
    },
    dark_mobile_nav_right: {
        width: '50%',
        height: '20px',
        float: 'left',
        paddingRight: '15px',
        textAlign: 'right',
        color: 'white',
        fontSize: '20px'
    },
    dark_nav_mobile_img: {
        maxWidth: '50px',
        maxHeight: '20px',
    },

    dark_org_menu_container: {
        float: 'right',
        display: 'table'
    },

    news_modal_info_box: {
        width: '100%',
        display: 'table',
        paddingTop: '30px',
        paddingBottom: '30px'
    },
    news_modal_title_text: {
        fontSize: '24px',
        fontWeight: 'bold',
        float: 'left',
        color: 'white'
    },
    news_modal_date_text: {
        fontSize: ' 18px',
        fontWeight: 'bold',
        float: 'right',
        color: 'white'
    },
    fixed_div: {
        position: 'absolute',
        width: '100vw',
        height: '100vh'
    },
    darkBG: {
        width: '100%',
        backgroundColor: 'rgb(20,20,20)',
        padding: '0px 0px 0px 0px'
    },
    darkNavBG: {
        width: '100%',
        backgroundColor: 'transparent',
        padding: '0px 0px 0px 0px'
    },
    darkMainBG: {
        width: '100%',
        padding: '0px 0px 0px 0px'
    },
    pageContraint: {
        width: '100%',
        display: 'table',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    pageTestContraint: {
        width: '100%',
        height: '100%',
        display: 'table',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    dark_pageContraint: {
        width: '100%',
        display: 'table',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: 'url("./images/dark_theme_bg_1.png")',
    },
    dark_pageTestContraint: {
        width: '100%',
        display: 'table',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: 'transparent',
    },
    darkHeader: {
        width: '100%',
        padding: '15px 20px 15px 20px',
        minHeight: '40px',
        display: 'table',
        position: 'fixed',
        zIndex: '1000',
        top: '0',
        left: '0',
        background: 'rgb(6,6,6)',
        borderBottom: '5px solid black'
    },
    darkHeaderInner: {
        width: '50%',
        height: '40px'
    },
    dark_body_container: {
        width: '100%',
        display: 'table',
        padding: '0px 15px 0px 15px',
        background: 'rgb(20,20,20)'
    },
    darkHeader_menu_div: {
        width: '100%',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'left',
        color: '#fff',
        cursor: 'pointer'
    },
    dark_header_logo: {
        height: '50px'
    },
    dark_social_menu_container: {
        float: 'left',
        display: 'table',
        paddingTop: '0px',
        paddingLeft: '25px'
    },
    dark_social_menu_item: {
        height: '50px',
        lineHeight: '50px',
        float: 'left',
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px'
    },
    org_menu_dark_item: {
        height: '50px',
        lineHeight: '50px',
        float: 'right',
        color: 'white',
        fontSize: '16px',
        fontWeight: '900',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'transparent'
    },
    org_hidden_menu_dark_item: {
        height: '50px',
        lineHeight: '50px',
        float: 'right',
        color: 'white',
        fontSize: '16px',
        fontWeight: '900',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'transparent',
        display: 'none'
    },
    dark_main_image_container: {
        width: '100%',
        heightMax: '500px',
        display: 'table',
        position: 'relative',
        marginTop: '10px'
    },
    dark_main_image: {
        width: '100%',
        maxHeight: '500px',
        objectFit: 'fill'
    },
    dark_main_image_text_container: {
        width: '100%',
        height: '40px',
        background: 'rgba(0,0,0,.5)',
        position: 'absolute',
        top: '0'
    },
    dark_main_image_text: {
        height: '40px',
        lineHeight: '40px',
        padding: '0px 10px 0px 10px',
        float: 'left',
        textAlign: 'center',
        color: 'white'
    },
    dark_news_container: {
        width: '100%',
        maxHeight: '610px',
        marginTop: '10px',
        paddingRight: '15px',
        float: 'left',
        overflowY: 'scroll'
    },
    dark_news__more_container: {
        width: '100%',
        height: '36px'
    },
    dark_news_more_button: {
        float: 'right',
        height: '36px',
        backgroundColor: 'rgb(50,50,50)',
        color: 'white',
        border: '2px solid rgba(0,0,0,.5)',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '2px',
        lineHeight: '36px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    dark_twitter_container: {
        width: '100%',
        maxHeight: '866px',
        padding: '30px',
        height: '500px',
        display: 'table'
    },
    dark_section_title_container: {
        width: '70%',
        color: '#767676',
        textAlign: 'left',
        marginTop: '10px'
    },
    dark_media_container: {
        width: '100%',
        display: 'table',
        backgroundColor: 'transparent',
        padding: '10px 0px 10px 0px'
    },

    dark_recent_matches_body: {
        width: '100%',
        maxHeight: '600px',
        backgroundColor: 'transparent',
        overflowY: 'scroll'
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
    organizationTestBG: {
        width: '100%',
        display: 'table',
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
        height: '35px'
    },
    body_container: {
        width: '100%',
        display: 'table',
        padding: '0px 15px 0px 15px',
        background: 'transparent'
    },
    roster_body_container: {
        width: '100%',
        height: '100vh',
        display: 'table',
        padding: '100px 15px 0px 15px',
        background: 'transparent'
    },
    roster_item_container: {
        width: '100%',
        display: 'table',
        borderColor: 'rgba(255,255,255,.2)',
        borderRadius: '10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        padding: '30px 0px 30px 0px',
        margin: '10px 0px 10px 0px'
    },
    roster_item_img_container: {
        width: '100px',
        height: '100px',
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px'
    },
    sponser_item_img_container: {
        width: '125px',
        height: '125px',
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '40%'
    },
    roster_item_img: {
        width: '100px',
        heght: '100px',
        borderRadius: '50px'
    },
    sponser_item_img: {
        width: '125px',
        heght: '125px',
        borderRadius: '10px'
    },
    roster_item_info_container: {
        width: '100%',
        height: '30px',
        textAlign: 'left'
    },
    roster_item_name_container: {
        width: '100%',
        height: '80px',
    },
    roster_name: {
        lineHeight: '80px',
        fontSize: '36px',
        fontWeight: '900',
        color: 'white'
    },
    roster_divider: {
        lineHeight: '80px',
        fontSize: '48px',
        fontWeight: '900',
        color: 'white',
        marginLeft: '10px',
        marginRight: '10px'
    },
    roster_item_about_container: {
        width: '100%',
        padding: '10px 30px 10px 10px',
        textAlign: 'left'
    },
    roster_item_social_container: {
        width: '100%',
        height: '40px',
    },
    roster_item_social_icon: {
        width: '40px',
        height: '40px',
        lineHeight: '40px',
        color: 'white',
        fontSize: '24px',
        textAlign: 'center',
        float: 'left'
    },
    roster_about_text: {
        lineHeight: '25px',
        fontWeight: '400',
        color: 'rgba(255,255,255,.8)'
    },
    roster_item_title: {
        height: '30px',
        lineHeight: '30px',
        fontSize: '16px',
        fontWeight: '900',
        color: 'rgba(255,255,255,.9)'
    },
    roster_item_text: {
        height: '30px',
        lineHeight: '30px',
        fontSize: '16px',
        fontWeight: '400',
        color: 'rgba(255,255,255,.7)'
    },
    nav_container: {
        display: 'table',
        width: '100%',
        height: '50px',
        paddingTop: '60px',
        paddingBottom: '15px',
        float: 'left'
    },
    nav_left: {
        width: '50%',
        height: '50px',
        float: 'left',
        display: 'table'
    },
    nav_right: {
        width: '50%',
        height: '50px',
        float: 'left',
        display: 'table'
    },
    org_menu_container: {
        float: 'right',
        display: 'table',
        height: '50px'
    },
    social_menu_container: {
        float: 'left',
        display: 'table',
        height: '50px',
        paddingLeft: '25px'
    },
    org_menu_item: {
        height: '50px',
        lineHeight: '50px',
        float: 'right',
        color: 'black',
        fontSize: '16px',
        fontWeight: '900',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'transparent',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px'
    },
    org_hidden_menu_item: {
        height: '50px',
        lineHeight: '50px',
        float: 'right',
        color: 'black',
        fontSize: '16px',
        fontWeight: '900',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'transparent',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px',
        display: 'none'
    },
    social_menu_item: {
        height: '50px',
        lineHeight: '50px',
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
        maxHeight: '50px'
    },
    organization_container: {
        width: '100%',
        height: '480px',
        position: 'relative',
        backgroundColor: 'black',
        backgroundSize: 'cover',
        overflow: 'hidden'
    },
    organization_image_logo: {
        width: '100%',
        height: '480px',
        position: 'relative',
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
        color: '#767676',
        textAlign: 'left'
    },
    section_video_title_container: {
        width: '100%',
        color: '#767676',
        textAlign: 'left',
        marginTop: '10px'
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
        color: 'white',
        marginBottom: '4px'
    },
    news_item_body: {
        width: '100%',
        height: '250px',
        paddingTop: '0px',
        position: 'relative',
        backgroundColor: 'black',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    },
    news_item_image: {
        width: '100%',
        height: '250px',
        objectFit: 'cover'
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
        textAlign: 'center',
        cursor: 'pointer'
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
        display: 'table',
        backgroundColor: 'transparent'
    },
    recent_matches_body: {
        width: '100%',
        height: '452px',
        backgroundColor: 'transparent'
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
    },

    //*************************************
    //  Admin Main
    //*********************************** */

    admin_main: {
        width: '100%'
    },
    menu_box_container: {
        height: '100%',
        width: '350px'
    },
    menu_title_container: {
        height: '80px',
        width: '100%',
        display: 'table',
        padding: '20px 15px 20px 15px',
        borderBottom: 'solid #333 1px'
    },
    menu_title_logo: {
        width: '60px',
        height: '40px',
        padding: '0 20px 0 0',
        float: 'left'
    },
    menu_title_image: {
        width: '40px',
        height: '40px'
    },
    menu_title_text: {
        height: '40px',
        lineHeight: '40px',
        fontSize: '1.8em',
        color: '#fff',
        textAlign: 'left'
    },
    menu_user_container: {
        width: '100%',
        height: '90px',
        padding: '20px 30px 20px 30px'
    },
    menu_user_logo: {
        width: '50px',
        height: '50px',
        float: 'left',
        marginRight: '30px',
        backgroundColor: '#333',
        borderRadius: '25px'
    },
    menu_user_image: {
        width: '50px',
        height: '50px'
    },
    menu_user_text: {
        height: '50px',
        paddingLeft: '30px',
        lineHeight: '50px',
        fontSize: '1.6em',
        color: '#fff',
        textAlign: 'left'
    },
    menu_item: {
        width: '100%',
        height: '30px',
        display: 'table'
    },
    menu_item_icon: {
        display: 'table',
        float: 'left',
        fontSize: '1,3em',
        padding: '5px 10px 5px 0',
        height: '30px',
        lineHeight: '30px'
    },
    menu_item_label: {
        display: 'table',
        width: '70%',
        float: 'left',
        fontSize: '1,3em',
        padding: '5px 0 5px 0',
        height: '30px',
        lineHeight: '30px',
        textAlign: 'left'
    },
    menu_item_dropdown: {
        padding: '10px'
    },
    admin_title_box: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        borderBottom: '1px solid #ccc'
    },
    media_title_box: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        padding: '30px 0px 10px 0px',
        display: 'table',
        borderBottom: '1px solid #ccc'
    },
    admin_main_logo_box: {
        width: '100%',
        padding: '15px 20px 50px 20px',
        display: 'table'
    },
    admin_main_logo_box_inner: {
        width: '50%',
        float: 'left',
        display: 'table'
    },
    admin_main_logo_spacer: {
        width: '100%',
        height: '50px'
    },
    admin_color_label: {
    },
    admin_color_picker: {
        height: '30px',
        width: '100%',
        marginTop: '10px'
    },
    admin_main_logo_button: {
        height: '30px',
        display: 'table',
        backgroundColor: '#0a9ab4',
        color: '#fff',
        borderRadius: '3px',
        cursor: 'pointer',
        lineHeight: '30px',
        paddingLeft: '16px',
        paddingRight: '16px'
    },
    admin_main_logo_image: {
        maxHeight: '320px',
        marginTop: '20px'
    },
    admin_social_box: {
        width: '100%',
        display: 'table',
        padding: '15px 20px 15px 20px'
    },
    admin_social_box_inner: {
        width: '50%',
        display: 'table',
        padding: '30px 30px 50px 0px',
        float: 'left'
    },
    roster_buttons_box: {
        width: '100%',
        display: 'table'
    },
    roster_team_button: {
        width: '98px',
        height: '38px',
        border: '1px solid rgba(34,36,38,.15)',
        background: 'rgb(248,248,248)',
        lineHeight: '28px',
        padding: '5px',
        color: '#000',
        textAlign: 'left',
        float: 'left',
        marginRight: '20px',
        cursor: 'pointer'
    },
    admin_roster_box_inner: {
        width: '25%',
        display: 'table',
        padding: '30px 10px 50px 0px',
        float: 'left'
    },
    admin_social_box_divider: {
        width: '100%',
        height: '50px'
    },
    admin_submit_box: {
        width: '100%',
        padding: '40px 0px 40px 0px',
        display: 'table'
    },
    admin_submit_button: {
        height: '40px',
        width: '100px',
        lineHeight: '40px',
        textAlign: 'center',
        backgroundColor: '#0a9ab4',
        borderRadius: '3px',
        cursor: 'pointer',
        color: '#fff',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    admin_footer: {
        width: '100%',
        height: '80px',
        textAlign: 'center',
        lineHeight: '80px',
        backgroundColor: '#ccc',
        color: '#fff'
    },
    admin_search_container: {
        width: '100%',
        padding: '40px 15px 40px 15px',
        borderTop: '1px solid #ccc'
    },
    admin_table_edit: {
        color: '#fff',
        cursor: 'pointer',
        background: '#ccc',
        textAlign: 'center',
        border: '1px solid #ccc'
    },
    admin_sponser_button: {
        width: '160px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        marginTop: '30px',
        backgroundColor: '#0a9ab4',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '3px'
    },
    admin_file_button: {
        width: '160px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        marginBottom: '10px',
        marginTop: '30px',
        backgroundColor: '#0a9ab4',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '3px'
    },
    modal_blog_media_preview: {
        width: '100%',
        float: 'left'
    },
    theme_modal_OR: {
        width: '100%',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'left',
        color: '#000',
        fontSize: '24px',
        fontWeight: 'bold'
    },
    theme_modal_small_container: {
        width: '100%',
        padding: '20px 0px 20px 0px',
        display: 'table'
    },
    theme_modal_small_img: {
        width: '100px',
        height: '50px',
        float: 'left',
        marginRight: '30px',
        cursor: 'pointer'
    },
    admin_sponser_file: {
        width: '0.1px',
        height: '0.1px',
        opacity: '0',
        overflow: 'hidden',
        position: 'absolute',
        zIndex: '-1',
    },
    admin_sponser_label: {
        backgroundColor: 'transparent',
        color: '#fff'
    },
    admin_sponser_image_box: {
        width: '150px',
        height: '100px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '20px',
        backgroundColor: '#ccc'
    },
    admin_sponser_description: {
        width: '100%',
        height: '150px',
        marginTop: '30px'
    },
    admin_sponser_image: {
        width: '150px',
        height: '100px'
    },
    modal_news_header: {
        width: '100%',
        height: '250px'
    },
    modal_news_header_image: {
        width: '100%',
        height: '250px',
        objectFit: 'cover'
    },
    modal_news_body: {
        width: '100%',
        height: '50vh',
        padding: '20px 15px 20px 15px',
        overflow: 'hidden'
    },
    modal_news_body_text: {
        width: '100%',
        height: '100%',
        color: 'white',
        overflowY: 'scroll'
    },
    modal_about_header: {
        width: '100%',
        height: '120px',
        lineHeight: '120px',
        textAlign: 'left',
        color: 'white',
        fontSize: '48px'
    },
    modal_inner: {
        width: '100%',
        padding: '15px',
        display: 'table',
        background: 'black'
    },
    modal_blog_media_container: {
        width: '100%',
        padding: '15px 0px 15px 0px',
        textAlign: 'center',
        display: 'table'
    },
    model_blog_media_preview: {
        maxHeight: '320px',
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    blog_add_actions: {
        width: '100%',
        padding: '20px 0px 20px 0px' 
    },
    theme_type_container: {
        width: '100%',
        display: 'table',
        padding: '20px 0px 20px 0px'
    },
    jumbotron_container: {
        width: '100%',
        display: 'table',
        position: 'relative',
        padding: '20px 0px 20px 30px' 
    },
    jumbotron_image: {
        width: '60%',
        height: '100%'
    },
    jumbotron_overlay: {
        position: 'absolute',
        top: '20px',
        left: '30px',
        width: '10%',
        height: '30px',
        lineHeight: '30px',
        backgroundColor: 'rgba(0,0,0,.4)',
        color: '#fff',
        textAlign: 'center',
        cursor: 'pointer'
    },
    //*************************************
    //  Individual Main
    //*********************************** */
    individual_bg: {
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'black',
        padding: '0px 10% 0px 10%',
        display: 'table'
    },
    individual_inner_bg: {
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'rgb(35,35,35)',
        display: 'table',
        padding: '0px 25px 0px 0px'
    },
    individual_header: {
        width: '100%',
        minHeight: '400px',
        backgroundImage: 'url("./images/profile-bannerbg.jpg")',
        backgroundSize: '100% 100% !important'
    },
    individual_basic_container: {
        width: '100%',
        minHeight: '100px',
        backgroundColor: 'white',
        display: 'table'
    },
    individual_profile_pic_container: {
        width: '170px',
        height: '170px',
        border: '2px solid #fff',
        borderRadius: '4px',
        backgroundColor: 'red',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-85px',
        overflow: 'visible'
    },
    individual_profile_pic: {
        width: '170px',
        height: '170px',
        border: '2px solid #fff',
        borderRadius: '4px'
    },
    individual_basic_name: {
        width: '100%',
        height: '30px',
        lineHeight: '30px',
        textAlign: 'center',
        fontSize: '24px',
        color: 'black',
        margin: '10px 0px 0px 0px'
    },
    individual_basic_handle: {
        width: '100%',
        height: '14px',
        lineHeight: '14px',
        textAlign: 'center',
        fontSize: '12px',
        color: 'black'
    },
    individual_table_container: {
        width: '100%',
        display: 'table',
        padding: '15px 15px 15px 15px'
    },
    individual_accomplishment_container: {
        width: '100%',
        minHeight: '761px',
        border: '1px solid rgb(228,228,228)',
        borderRadius: '4px',
        backgroundColor: 'rgb(245,245,245)'
    },
    individual_accomplishment_header: {
        margin: '0 0 0 0',
        padding: '13px 15px 12px 15px',
        background: '#127f93',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600'
    },
    individual_basic_text: {
        width: '100%',
        height: '16px',
        lineHeight: '16px',
        fontSize: '12px',
        color: 'black',
        marginTop: '5px',
        display: 'table'
    },
    individual_footer: {
        width: '100%',
        height: '60px',
        lineHeight: '60px',
        textAlign: 'center',
        color: 'white'
    },
    individual_social_box: {
        width: '100%',
        minHeight: '394px',
        backgroundColor: 'rgb(56,56,56)',
        borderRadius: '8px'
    },
    individual_social_header: {
        margin: '0 0 0 0',
        padding: '13px 15px 12px 15px',
        background: '#127f93',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        borderRadius: '8px 8px 0px 0px'
    },
    individual_social_content: {
        width: '100%',
        display: 'table',
    },
    individual_social_empty: {
        width: '100%',
        textAlign: 'center',
        padding: '5px 0px 5px 0px',
        color: 'white',
        fontSize: '14px'
    },
    /******************************
     ** Sub domain page          **
     ******************************/
    subdomain_logo_upload_container: {
        width: '100%',
        display: 'table',
        margin: '5px 5px 5px 5px'
    },
    subdomain_logo_upload: {
        maxWidth: '100%',
        maxHeight: '320px'
    },
    subdomain_select_text: {
        width: '100%',
        height: '30px',
        lineHeight: '30px',
        color: 'white',
        textAlign: 'center'
    },
    subdomain_theme_container: {
        width: '100%',
        display: 'table',
        padding: '20px 20px 20px 20px'
    },
    subdomain_theme_img: {
        width: '100%'
    },
    theme_title_text: {
        width: '100%',
        textAlign: 'center',
        height: '30px',
        lineHeight: '30px',
        color: 'white',
        fontSize: '18px'
    },
    theme_description_text: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        padding: '0px 15px 50px 15px'
    },
    subdomain_header: {
        width: '100%',
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
    subdomainModalContent: {
        width: '100%',
        paddingLeft: '15px',
        paddingRight: '15px',
        display: 'table'
    },
    //*************************************
    //  Landing Page
    //*********************************** */
    landing_body: {
        width: '100%',
        background: 'linear-gradient(#061216, #3d4344)',
        display: 'table'
    },
    landing_header: {
        width: '100%',
        padding: '30px 50px 30px 50px',
        position: 'absolute',
        top: '0'
    },
    lading_header_button: {
        width: '40px',
        height: '40px'
    },
    landing_menu_modal: {
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'none',
        background: '#000'
    },
    menu_modal_header: {
        width: '100%',
        height: '100px',
        display: 'table',
        textAlign: 'left',
        padding: '0px 75px 0px 75px'
    },
    menu_close: {
        color: '#fff',
        height: '100px',
        lineHeight: '100px',
        fontWeight: 'bold',
        fontSize: '24px',
        cursor: 'pointer'
    },
    menu_modal_item_container: {
        width: '100%',
        height: '100px',
        padding: '0px 175px 0px 175px',
        textAlign: 'left',
        color: '#fff',
        fontSize: '48px',
        lineHeight: '100px',
        opacity: '0',
        cursor: 'pointer'
    },
    landing_content_container: {
        width: '100%',
        height: '100vh',
        color: '#fff',
        padding: '30px'
    },
    landing_outer_welcome_container: {
        width: '100%',
        height: '100vh',
        color: '#fff'
    },
    landing_individual_body: {
        opacity: '0'
    },
    landing_individual_container: {
        width: '100%',
        height: '100vh',
        color: '#fff',
        padding: '30px',
        position: 'relative'
    },
    landing_welcome_container: {
        width: '100%',
        height: '100vh',
        paddingTop: '250px',
        backgroundImage: 'url("./images/banner-bg.jpg")',
        backgroundSize: 'cover'
    },
    landing_welcome_lines_container: {
        width: '100%',
        height: '200px',
        display: 'table',
        backgroundImage: 'url("./images/title-bg.png")',
        objectFit: 'fill'
    },
    landing_welcome_lines_image: {
        height: '200px',
        marginLeft: '150px'
    },
    landing_page_button_container: {
        width: '100%',
        display: 'table',
        position: 'fixed',
        bottom: '75px',
        zIndex: '100'
    },
    landing_page_join_button: {
        width: '300px',
        textAlign: 'center',
        padding: '15px',
        background: '#0a9ab4',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '24px',
        marginLeft: 'auto',
        marginRight: 'auto',
        cursor: 'pointer'
    },
    landing_org_header_text: {
        width: '100%',
        height: '100px',
        lineHeight: '100px',
        color: '#fff',
        fontSize: '48px',
        fontWeight: 'bold',
        padding: '0px 30px 0px 30px',
        opacity: '0'
    },
    landing_org_header_text_blue: {
        color: '#0a9ab4'
    },
    landing_org_body: {
        width: '100%',
        display: 'table',
        color: '#fff',
        fontSize: '18px',
        lineHeight: '1.4em',
        padding: '0px 30px 0px 30px',
        opacity: '0'
    },
    landing_org_diagram: {
        width: '100%',
        display: 'table',
        paddingTop: '25px',
        opacity: '0'
    },
    landing_org_line: {
        width: '10px',
        height: '40px',
        background: '#0a9ab4',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    landing_org_arrow: { 
        width: '0', 
        height: '0', 
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderTop: '20px solid #0a9ab4',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    landing_org_arrow_box: {
        width: '300px',
        height: '80px',
        lineHeight: '80px',
        backgroundColor: '#0a9ab4',
        borderRadius: '15px',
        color: '#fff',
        fontSize: '24px',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    landing_why_content: {
        width: '100%',
        display: 'table',
        padding: '150px 175px 150px 175px',
        opacity: '0'
    },
    landing_why_header: {
        width: '100%',
        color: '#0a9ab4',
        fontSize: '48px',
        fontWeight: 'bold'
    },
    landing_why_body: {
        width: '100%',
        color: '#ffffff',
        fontSize: '36px',
        paddingTop: '75px'
    },
    landing_individual_image_container: {
        padding: '15px',
        display: 'table'
    },
    landing_individual_image: {

    },
    coming_soon_div: {
        width: '100%',
        height: '100vh',
        lineHeight: '80vh',
        color: '#0a9ab4',
        textAlign: 'center',
        fontSize: '96px',
        fontWeight: 'bold',
        position: 'absolute',
        top: '0'
    },
    landing_individual_header: {
        width: '100%',
        height: '80px',
        textAlign: 'left',
        lineHeight: '80px',
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#0a9ab4'
    },
    landing_individual_text: {
        width: '100%',
        textAlign: 'left',
        fontSize: '22px',
        color: '#ffffff'
    },
    landing_upcoming_video: {
        padding: '130px 15px 100px 30px'
    },
    upcoming_opacity: {
        opacity: '0'
    },
    upcoming_header: {
        width: '100%',
        height: '100px',
        lineHeight: '100px',
        textAlign: 'center',
        color: '#0a9ab4',
        fontSize: '36px'
    },
    upcoming_title: {
        width: '100%',
        height: '80px',
        lineHeight: '80px',
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: '15px'
    },
    upcoming_body: {
        width: '100%',
        color: '#fff',
        lineHeight: '1.4em',
        fontSize: '18px',
        fontWeight: 'lighter',
        textAlign: 'left',
        paddingLeft: '15px'
    },
    landing_footer: {
        width: '100%',
        height: '80px',
        textAlign: 'center'
    },
    landing_footer_text: {
        height: '80px',
        lineHeight: '80px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '18px'
    }
});


