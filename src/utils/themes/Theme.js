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
    // New Obliviot Theme
    // ***************************************************************

    obliviot_dark_info_container: {
        width: '100%',
        height: '35px'
    },

    obliviot_dark_info_image: {
        height: '35px',
        marginLeft: '20px',
        marginRight: '20px',
        float: 'left'
    },

    obliviot_dark_info_content_container: {
        height: '35px',
        textAlign: 'left',
        lineHeight: '35px',
        fontSize: '18px',
        fontWeight: '900',
        color: 'white'
    },

    obliviot_light_info_container: {
        width: '100%',
        height: '35px'
    },

    obliviot_light_info_image: {
        height: '35px',
        marginLeft: '20px',
        marginRight: '20px',
        float: 'left'
    },

    obliviot_light_info_content_container: {
        height: '35px',
        textAlign: 'left',
        lineHeight: '35px',
        fontSize: '18px',
        fontWeight: '900',
        color: 'white'
    },

    obliviot_mobile_menu: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'rgb(255,255,255)'
    },
    obliviot_mobile_menu_item: {
        width: '100%',
        height: '50px',
        color: 'white',
        lineHeight: '50px',
        paddingLeft: '15px',
        borderWidth: '1px',
        borderColor: 'rgb(225,225,225)',
        borderStyle: 'solid',
        cursor: 'pointer'
    },
    obliviot_mobile_menu_item_box: {
        width: '100%',
        height: '50px',
        color: 'black',
        lineHeight: '50px',
        paddingLeft: '15px'
    },
    obliviot_mobile_submenu_item_box: {
        width: '100%',
        height: '50px',
        color: 'rgba(0,0,0,.9)',
        lineHeight: '50px',
        paddingLeft: '30px',
        fontSize: '.9em'
    },
    obliviot_news_title: {
        fontWeight: '600',
        textAlign: 'left',
    },
    obliviot_news_date: {
        fontWeight: '400',
        fontSize: '12px',
        textAlign: 'right',
        float: 'right'
    },
    obliviot_nav_container: {
        display: 'table',
        width: '100%',
        height: '50px',
        marginTop: '40px',
        paddingTop: '60px',
        paddingBottom: '0px'
    },
    obliviot_nav_left: {
        width: '100%',
        height: '50px',
        display: 'table',
        paddingLeft: '30px'
    },
    obliviot_nav_right: {
        width: '100%',
        height: '50px',
        display: 'table',
        paddingRight: '30px'
    },
    obliviot_nav_center: {
        width: '100%',
        height: '50px',
        display: 'table'
    },
    obliviot_nav_header: {
        display: 'table',
        height: '50px',
        width: '100%',
        textAlign: 'center'
    },
    obliviot_nav_img: {
        maxWidth: '100px',
        maxHeight: '50px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    obliviot_mobile_nav_container: {
        width: '100%',
        height: '20px',
        background: 'white'
    },
    obliviot_mobile_nav_left: {
        width: '50%',
        height: '20px',
        float: 'left',
        paddingLeft: '15px',
    },
    obliviot_mobile_nav_right: {
        width: '50%',
        height: '20px',
        float: 'left',
        paddingRight: '15px',
        textAlign: 'right',
        color: 'black',
        fontSize: '20px'
    },
    obliviot_nav_mobile_img: {
        maxWidth: '50px',
        maxHeight: '20px',
    },

    obliviot_org_menu_container: {
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
    obliviotBG: {
        width: '100%',
        backgroundColor: 'rgb(255,255,255)',
        padding: '0px 0px 0px 0px'
    },
    obliviotNavBG: {
        width: '100%',
        backgroundColor: 'transparent',
        padding: '0px 0px 0px 0px'
    },
    obliviotMainBG: {
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
    obliviot_pageContraint: {
        width: '100%',
        display: 'table',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: 'rgb(255,255,255)',
    },
    obliviot_pageTestContraint: {
        width: '100%',
        display: 'table',
        maxWidth: '1200px',
        minHeight: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: 'transparent',
    },
    obliviotHeader: {
        width: '100%',
        padding: '15px 20px 15px 20px',
        minHeight: '40px',
        position: 'fixed',
        top: '0',
        left: '0',
        background: 'rgb(255,255,255)',
        borderBottom: '5px solid white'
    },
    obliviotHeaderInner: {
        width: '50%',
        height: '40px'
    },
    obliviot_body_container: {
        width: '100%',
        display: 'table',
        padding: '0px 15px 0px 15px',
        background: 'rgb(255,255,225)'
    },
    obliviotHeader_menu_div: {
        width: '100%',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'left',
        color: '#000',
        cursor: 'pointer'
    },
    obliviot_header_logo: {
        height: '50px'
    },
    obliviot_social_menu_container: {
        float: 'left',
        display: 'table',
        paddingTop: '0px',
        paddingLeft: '25px'
    },
    obliviot_social_menu_item: {
        lineHeight: '50px',
        float: 'left',
        color: 'black',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px'
    },
    org_menu_obliviot_item: {
        height: '50px',
        lineHeight: '50px',
        float: 'right',
        color: 'black',
        fontSize: '16px',
        fontWeight: '900',
        cursor: 'pointer',
        padding: '0px 2px 0px 2px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'transparent'
    },
    org_hidden_menu_obliviot_item: {
        height: '50px',
        lineHeight: '50px',
        float: 'right',
        color: 'black',
        fontSize: '16px',
        fontWeight: '900',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'transparent',
        display: 'none'
    },
    obliviot_main_image_container: {
        width: '100%',
        heightMax: '500px',
        display: 'table',
        position: 'relative',
        marginTop: '10px'
    },
    obliviot_main_image: {
        width: '100%',
        maxHeight: '500px',
        objectFit: 'fill'
    },
    obliviot_main_image_text_container: {
        width: '100%',
        height: '40px',
        background: 'rgba(255,255,255,.9)',
        position: 'absolute',
        top: '0'
    },
    obliviot_main_image_text: {
        height: '40px',
        lineHeight: '40px',
        padding: '0px 10px 0px 10px',
        float: 'left',
        textAlign: 'center',
        color: 'black'
    },
    obliviot_news_container: {
        width: '100%',
        maxHeight: '610px',
        marginTop: '10px',
        paddingRight: '15px',
        float: 'left',
        overflowY: 'scroll'
    },
    obliviot_news__more_container: {
        width: '100%',
        height: '36px'
    },
    obliviot_news_more_button: {
        float: 'right',
        height: '36px',
        backgroundColor: 'rgb(50,50,50)',
        color: 'white',
        border: '2px solid rgba(0,0,0rf,.5)',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '2px',
        lineHeight: '36px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    obliviot_twitter_container: {
        width: '100%',
        maxHeight: '866px',
        padding: '30px',
        height: '500px',
        display: 'table'
    },
    obliviot_section_title_container: {
        width: '70%',
        color: '#767676',
        textAlign: 'left',
        marginTop: '10px'
    },
    obliviot_media_container: {
        width: '100%',
        display: 'table',
        backgroundColor: 'transparent',
        padding: '10px 0px 10px 0px'
    },

    obliviot_recent_matches_body: {
        width: '100%',
        maxHeight: '600px',
        backgroundColor: 'transparent',
        overflowY: 'scroll'
    },

    // ***************************************************************
    // New Obliviot Theme Dark
    // ***************************************************************

    darkObliotBG: {
        width: '100%',
        minHeight: '100vh',
        padding: '0px 0px 0px 0px',
        backgroundColor: '#000',
        position: 'absolute'
    },

    obliviot_darkContraint: {
        width: '100%',
        maxWidth: '1200px',
        minHeight: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: 'transparent',
    },

    obliviot_dark_bg_img: {
        position: 'absolute',
        top: '0px',
        left: '0px'
    },

    obliviot_dark_bg_filter: {
        width: '100%',
        minHeight: '100vh',
        position: 'absolute',
        zIndex: '-1',
        top: '0px',
        left: '0px',
        backgroundColor: 'rgba(0,0,0,.8)'
    },

    obliviot_darkHeader: {
        width: '100%',
        maxHeight: '90px'
    },

    obliviot_darkLogo: {
        maxWidth: '100%',
        maxHeight: '60px'
    },

    obliviot_dark_social_menu_container: {
        float: 'left',
        display: 'table',
        paddingTop: '0px',
        paddingLeft: '25px'
    },

    obliviot_dark_social_menu_item: {
        lineHeight: '80px',
        float: 'left',
        color: '#ccc',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px'
    },

    obliviot_org_menu_dark_container: {
        float: 'right',
        display: 'table'
    },

    org_menu_obliviot_dark_item : {
        height: '80px',
        lineHeight: '80px',
        float: 'right',
        color: 'white',
        fontSize: '18px',
        fontWeight: '900',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'transparent',
        position: 'relative',
        display: 'inline-block'
    },

    obliviot_darkSponserImage: {
        height: '70px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table'
    },

    obliviot_darkBlogContainer: {
        width: '100%',
        height: '600px',
        marginTop: '20px',
        display: 'table'
    },

    obliviot_darkBlogMiniContainer: {
        width: '100%',
        height: '295px',
        marginBottom: '10px',
        position: 'relative',
        cursor: 'pointer'
    },

    obliviot_darkBlogMaxContainer: {
        width: '100%',
        height: '600px',
        position: 'relative',
        cursor: 'pointer'
    },

    obliviot_main_news_item_image: {
        width: '100%',
        height: '600px',
        objectFit: 'cover'
    },

    obliviot_main_news_item_mini_image: {
        width: '100%',
        height: '295px',
        objectFit: 'cover'
    },

    obliviot_main_news_item_micro_image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    },

    obliviot_dark_main_news_content_container: {
        width: '100%',
        height: '50px',
        position: 'absolute',
        bottom: '0px',
        left: '0%',
        padding: '5px',
        paddingLeft: '20px',
        backgroundColor: 'rgba(0,0,0,.5)'
    },

    obliviot_dark_news_title: {
        textAlign: 'left',
        fontSize: '20px',
        lineHeight: '30px',
        color: 'white',
        fontWeight: '900',
        textTransform: 'uppercase'
    },

    obliviot_dark_news_body: {
        textAlign: 'left',
        fontSize: '14px',
        color: 'white',
        fontWeight: 'bold',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    obliviot_dark_news_decor: {
        height: '5px',
        width: '40%',
        backgroundColor: 'rgb(241,221,96)',
        marginTop: '10px'
    },

    obliviot_dark_section_control_container: {
        width: '100%',
        height: '20px',
        position: 'relative',
        display: 'table',
        marginTop: '30px',
        marginBottom: '5px'
    },

    obliviot_dark_section_divider: {
        width: '100%',
        height: '2px',
        backgroundColor: 'rgba(255,255,255,.5)',
        marginTop: '9px',
        position: 'absolute'
    },

    obliviot_dark_section_title: {
        height: '20px',
        lineHeight: '20px',
        fontSize: '16px',
        fontWeight: '900',
        color: 'white',
        backgroundColor: 'black',
        paddingRight: '10px',
        position: 'absolute',
        left: '0px'
    },

    obliviot_dark_section_view_more: {
        height: '20px',
        lineHeight: '20px',
        fontSize: '12px',
        fontWeight: '900',
        color: 'rgba(255,255,255,.5)',
        backgroundColor: 'black',
        paddingLeft: '10px',
        position: 'absolute',
        right: '0px',
        cursor: 'pointer'
    },

    obliviot_dark_twitch_container: {
        width: '100%',
        overflowX: 'scroll',
        overflowY: 'hidden',
        height: '150px',
        marginTop: '10px',
        whiteSpace: 'nowrap'
    },

    obliviot_dark_twitch_left_arrow: {
        height: '50px',
        width: '50px',
        textAlign: 'center',
        lineHeight: '50px',
        color: 'white',
        fontSize: '20px',
        fontWeight: '900',
        backgroundColor: 'rgba(0,0,0,.8)',
        position: 'absolute',
        zIndex: '100',
        top: '50px',
        left: '0px',
        cursor: 'pointer'
    },

    obliviot_dark_twitch_right_arrow: {
        height: '50px',
        width: '50px',
        textAlign: 'center',
        lineHeight: '50px',
        color: 'white',
        fontSize: '20px',
        fontWeight: '900',
        backgroundColor: 'rgba(0,0,0,.8)',
        position: 'absolute',
        zIndex: '100',
        top: '50px',
        right: '0px',
        cursor: 'pointer'
    },

    obliviot_dark_matches_left_arrow: {
        height: '50px',
        width: '50px',
        textAlign: 'center',
        lineHeight: '50px',
        color: 'white',
        fontSize: '20px',
        fontWeight: '900',
        backgroundColor: 'rgba(0,0,0,.8)',
        position: 'absolute',
        zIndex: '100',
        top: '50px',
        left: '0px',
        cursor: 'pointer'
    },

    obliviot_dark_matches_right_arrow: {
        height: '50px',
        width: '50px',
        textAlign: 'center',
        lineHeight: '50px',
        color: 'white',
        fontSize: '20px',
        fontWeight: '900',
        backgroundColor: 'rgba(0,0,0,.8)',
        position: 'absolute',
        zIndex: '100',
        top: '50px',
        right: '0px',
        cursor: 'pointer'
    },

    obliviot_dark_twitch_feed_container: {
        width: '300px',
        height: '150px',
        backgroundColor: 'rgba(255,255,255,.1)',
        position: 'relative',
        float: 'left',
        marginRight: '5px'
    },

    obliviot_dark_twitch_title_container: {
        width: '100%',
        padding: '0px 0px 10px 20px',
        position: 'absolute',
        bottom: '0px',
        left: '0px'
    },

    obliviot_dark_twitch_title: {
        color: 'white',
        fontSize: '18px',
        fontWeight: '900',
        textAlign: 'left',
        lineHeight: '22px',
        width: '100%'
    },

    obliviot_dark_twitch_subtitle: {
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: '18px',
        width: '100%'
    },

    obliviot_dark_user_online: {
        height: '30px',
        width: '120px',
        borderRadius: '15px',
        background: 'linear-gradient(to right, rgba(143,209,90,0) , rgba(143,209,90,.8))',
        position: 'absolute',
        top: '10px',
        right: '15px',
        padding: '3px'
    },

    obliviot_dark_user_offline: {
        height: '30px',
        width: '120px',
        borderRadius: '15px',
        background: 'linear-gradient(to right, rgba(255,255,255,0) , rgba(255,255,255,.2))',
        position: 'absolute',
        top: '10px',
        right: '15px',
        padding: '3px'
    },

    obliviot_dark_user_image: {
        height: '24px',
        width: '24px',
        borderRadius: '12px',
        float: 'right'
    },

    obliviot_dark_user_online_text: {
        lineHeight: '24px',
        paddingRight: '15px',
        color: 'white',
        float: 'right',
        fontSize: '18',
        fontWeight: '900',
        textTransform: 'uppercase'
    },

    obliviot_dark_news_outer_constraint: {
        width: '100%',
        height: '630px',
        overflow: 'hidden',
    },

    obliviot_dark_news_constraint: {
        width: '100%',
        height: '630px',
        overflowY: 'scroll',
        paddingRight: '17px',
        boxSizing: 'content-box'
    },

    obliviot_dropdown_container: {
        display: 'none',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        lineHeight: '30px',
        fontSize: '18px',
        color: 'white',
        minWidth: '160px',
        padding: '10px 30px 10px 0px',
        top: '80px',
        right: '150px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        zIndex: '1'
    },

    obliviot_dark_news_container: {
        width: '100%',
        height: '200px',
        backgroundColor: 'rgba(255,255,255,.1)',
        marginTop: '10px',
        position: 'relative',
        cursor: 'pointer'
    },

    obliviot_dark_video_container: {
        width: '100%',
        height: '150px',
        backgroundColor: 'rgba(255,255,255,.1)',
        marginTop: '10px'
    },

    obliviot_dark_matches_holder: {
        width: '100%',
        overflow: 'auto',
        whiteSpace: 'nowrap',
        marginTop: '15px'
    },

    obliviot_dark_match_container: {
        width: '33.3%',
        padding: '20px 30px 0px 30px',
        backgroundColor: 'rgba(255,255,255,0.0)',
        position: 'relative',
        float: 'left'
    },

    obliviot_dark_match_vs_container: {
        width: '300px',
        height: '70px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    obliviot_dark_match_vs_image_holder: {
        width: '70px',
        height: '70px',
        lineHeight: '70px',
        float: 'left'
    },

    obliviot_dark_match_vs_image: {
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'inline-block',
        margin: '0 auto',
        verticalAlign: 'middle'
    },

    obliviot_dark_match_vs_score: {
        width: '160px',
        height: '70px',
        lineHeight: '70px',
        textAlign: 'center',
        color: 'white',
        fontSize: '18px',
        fontWeight: '900',
        float: 'left'
    },

    obliviot_dark_match_vs_date: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        color: 'white',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '900',
        marginTop: '20px'
    },

    obliviot_dark_corner_win: {
        width: '0',
        height: '0',
        borderStyle: 'solid',
        borderWidth: '20px 20px 0 0',
        borderColor: '#90ce59 transparent transparent transparent',
        position: 'absolute',
        top: '0',
        left: '0'     
    },

    obliviot_dark_corner_lose: {
        width: '0',
        height: '0',
        borderStyle: 'solid',
        borderWidth: '20px 20px 0 0',
        borderColor: '#e85149 transparent transparent transparent',
        position: 'absolute',
        top: '0',
        left: '0'          
    },
    obliviot_dark_bottom_nav: {
        width: '100%',
        marginTop: '30px'
    },

    obliviot_dark_bottom_nav_logo: {
        width: '100%'
    },

    obliviot_dark_bottom_nav_title: {
        width: '100%',
        textAlign: 'left',
        lineHeight: '30px',
        color: 'white',
        fontSize: '18px',
        fontWeight: '900'
    },

    obliviot_dark_bottom_nav_sub: {
        width: '100%',
        textAlign: 'left',
        lineHeight: '30px',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'medium'
    },

    obliviot_orgFooter: {
        textAlign: 'center',
        width: '100%',
        background: '#000000',
        padding: '20px',
    },
    obliviot_orgFooterText: {
        padding: '0',
        margin: '0',
        fontSize: '16px',
        fontWeight: '400',
        color: '#FFF'
    },

    // ***************************************************************
    // New Obliviot Theme Light
    // ***************************************************************

    lightObliotBG: {
        width: '100%',
        minHeight: '100vh',
        padding: '0px 0px 0px 0px',
        backgroundColor: '#fff',
        position: 'absolute'
    },

    lightFelzecBG: {
        width: '100%',
        minHeight: '100vh',
        padding: '0px 0px 0px 0px',
        backgroundColor: '#000',
        position: 'absolute'
    },

    obliviot_lightContraint: {
        width: '100%',
        maxWidth: '1200px',
        minHeight: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: 'transparent',
    },

    obliviot_light_bg_img: {
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: '0px',
        left: '0px'
    },

    obliviot_light_bg_filter: {
        width: '100%',
        minHeight: '100vh',
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: '-1',
        backgroundColor: 'rgba(255,255,255,.8)'
    },

    obliviot_lightHeader: {
        width: '100%',
        maxHeight: '90px'
    },

    obliviot_lightLogo: {
        maxWidth: '100%',
        maxHeight: '60px'
    },

    obliviot_light_social_menu_container: {
        float: 'left',
        display: 'table',
        paddingTop: '0px',
        paddingLeft: '25px'
    },

    obliviot_light_social_menu_item: {
        lineHeight: '80px',
        float: 'left',
        color: '#444',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px'
    },

    obliviot_org_menu_light_container: {
        float: 'right',
        display: 'table'
    },

    org_menu_obliviot_light_item : {
        height: '80px',
        lineHeight: '80px',
        float: 'right',
        color: 'black',
        fontSize: '18px',
        fontWeight: '900',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'transparent',
        position: 'relative',
        display: 'inline-block'
    },

    obliviot_lightSponserImage: {
        height: '70px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table'
    },

    obliviot_lightBlogContainer: {
        width: '100%',
        height: '600px',
        marginTop: '20px',
        display: 'table'
    },

    obliviot_lightBlogMiniContainer: {
        width: '100%',
        height: '295px',
        marginBottom: '10px',
        position: 'relative',
        cursor: 'pointer'
    },

    obliviot_lightBlogMaxContainer: {
        width: '100%',
        height: '600px',
        position: 'relative',
        cursor: 'pointer'
    },

    obliviot_main_news_item_image: {
        width: '100%',
        height: '600px',
        objectFit: 'cover'
    },

    obliviot_main_news_item_mini_image: {
        width: '100%',
        height: '295px',
        objectFit: 'cover'
    },

    obliviot_main_news_item_micro_image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    },

    obliviot_light_main_news_content_container: {
        width: '100%',
        height: '50px',
        position: 'absolute',
        bottom: '0px',
        left: '0%',
        padding: '5px',
        paddingLeft: '20px',
        backgroundColor: 'rgba(255,255,255,.5)'
    },

    obliviot_light_news_title: {
        textAlign: 'left',
        fontSize: '20px',
        lineHeight: '30px',
        color: 'black',
        fontWeight: '900',
        textTransform: 'uppercase'
    },

    obliviot_light_news_body: {
        textAlign: 'left',
        fontSize: '14px',
        color: 'black',
        fontWeight: 'bold',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    obliviot_light_news_decor: {
        height: '5px',
        width: '40%',
        backgroundColor: 'rgb(241,221,96)',
        marginTop: '10px'
    },

    obliviot_light_section_control_container: {
        width: '100%',
        height: '20px',
        position: 'relative',
        display: 'table',
        marginTop: '30px',
        marginBottom: '5px'
    },

    obliviot_light_section_divider: {
        width: '100%',
        height: '2px',
        backgroundColor: 'rgba(0,0,0,.5)',
        marginTop: '9px',
        position: 'absolute'
    },

    obliviot_light_section_title: {
        height: '20px',
        lineHeight: '20px',
        fontSize: '16px',
        fontWeight: '900',
        color: 'black',
        backgroundColor: 'white',
        paddingRight: '10px',
        position: 'absolute',
        left: '0px'
    },

    obliviot_light_section_view_more: {
        height: '20px',
        lineHeight: '20px',
        fontSize: '12px',
        fontWeight: '900',
        color: 'rgba(0,0,0,.5)',
        backgroundColor: 'white',
        paddingLeft: '10px',
        position: 'absolute',
        right: '0px',
        cursor: 'pointer'
    },

    obliviot_light_twitch_container: {
        width: '100%',
        overflowX: 'scroll',
        overflowY: 'hidden',
        height: '150px',
        marginTop: '10px',
        whiteSpace: 'nowrap'
    },

    obliviot_light_twitch_feed_container: {
        width: '300px',
        height: '150px',
        backgroundColor: 'rgba(0,0,0,.1)',
        position: 'relative',
        float: 'left',
        marginRight: '6px'
    },

    obliviot_twitch_thumbnail: {
        width: '300px',
        height: '150px',
        objectFit: 'fill'
    },

    obliviot_twitch_overlay: {
        width: '300px',
        height: '20px',
        backgroundColor: 'rgba(0,0,0,.7)',
        position: 'absolute',
        top: '0px',
        left: '0px',
        paddingLeft: '10px',
        paddingRight: '10px',
        textAlign: 'left'
    },

    obliviot_light_twitch_title_container: {
        width: '100%',
        padding: '0px 0px 10px 20px',
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        textAlign: 'left'
    },

    obliviot_twitch_overlay_text: {
        height: '20px',
        lineHeight: '20px',
        fontSize: '16px',
        fontWeight: '900',
        color: 'white'
    },

    obliviot_twitch_overlay_status: {
        width: '18px',
        height: '18px',
        position: 'absolute',
        top: '2px',
        right: '10px',
        borderRadius: '9px',
        backgroundColor: 'red'
    },

    obliviot_light_twitch_title: {
        color: 'black',
        fontSize: '18px',
        fontWeight: '900',
        textAlign: 'left',
        lineHeight: '22px',
        width: '100%'
    },

    obliviot_light_twitch_subtitle: {
        color: 'black',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: '18px',
        width: '100%'
    },

    obliviot_light_user_online: {
        height: '30px',
        width: '120px',
        borderRadius: '15px',
        background: 'linear-gradient(to right, rgba(143,209,90,0) , rgba(143,209,90,.8))',
        position: 'absolute',
        top: '10px',
        right: '15px',
        padding: '3px'
    },

    obliviot_light_user_offline: {
        height: '30px',
        width: '120px',
        borderRadius: '15px',
        background: 'linear-gradient(to right, rgba(255,255,255,0) , rgba(255,255,255,.2))',
        position: 'absolute',
        top: '10px',
        right: '15px',
        padding: '3px'
    },

    obliviot_light_user_image: {
        height: '24px',
        width: '24px',
        borderRadius: '12px',
        float: 'right'
    },

    obliviot_light_user_online_text: {
        lineHeight: '24px',
        paddingRight: '15px',
        color: 'white',
        float: 'right',
        fontSize: '18',
        fontWeight: '900',
        textTransform: 'uppercase'
    },

    obliviot_light_news_outer_constraint: {
        width: '100%',
        height: '630px',
        overflow: 'hidden',
    },

    obliviot_light_news_constraint: {
        width: '100%',
        height: '630px',
        overflowY: 'scroll',
        paddingRight: '17px',
        boxSizing: 'content-box'
    },

    obliviot_dropdown_container: {
        display: 'none',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        lineHeight: '30px',
        fontSize: '18px',
        color: 'white',
        minWidth: '160px',
        padding: '10px 30px 10px 0px',
        top: '80px',
        right: '150px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        zIndex: '1'
    },

    obliviot_dropdown_container_close: {
        position: 'absolute',
        top: '0px',
        right: '4px',
        color: 'white',
        backgroundColor: 'black',
        padding: '2px 0px 2px 0px',
        fontSize: '14px',
        fontWeight: '900',
        zIndex: '10'
    },

    obliviot_light_news_container: {
        width: '100%',
        height: '200px',
        backgroundColor: 'rgba(0,0,0,.1)',
        marginTop: '10px',
        position: 'relative',
        cursor: 'pointer'
    },

    obliviot_light_video_container: {
        width: '100%',
        height: '150px',
        backgroundColor: 'rgba(0,0,0,.1)',
        marginTop: '10px'
    },

    felzec_light_video_container: {
        width: '426px',
        height: '240px',
        backgroundColor: 'rgba(0,0,0,.1)',
        float: 'left'
    },

    obliviot_light_matches_holder: {
        width: '100%',
        overflow: 'auto',
        whiteSpace: 'nowrap',
        marginTop: '15px'
    },

    obliviot_light_match_container: {
        width: '33.3%',
        padding: '20px 30px 0px 30px',
        backgroundColor: 'rgba(255,255,255,0.0)',
        position: 'relative',
        float: 'left'
    },

    obliviot_light_match_vs_container: {
        width: '300px',
        height: '70px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    obliviot_light_match_vs_image_holder: {
        width: '70px',
        height: '70px',
        lineHeight: '70px',
        float: 'left'
    },

    obliviot_light_match_vs_image: {
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'inline-block',
        margin: '0 auto',
        verticalAlign: 'middle'
    },

    obliviot_light_match_vs_score: {
        width: '160px',
        height: '70px',
        lineHeight: '70px',
        textAlign: 'center',
        color: 'black',
        fontSize: '18px',
        fontWeight: '900',
        float: 'left'
    },

    obliviot_light_match_vs_date: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        color: 'black',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '900',
        marginTop: '20px'
    },

    obliviot_light_corner_win: {
        width: '0',
        height: '0',
        borderStyle: 'solid',
        borderWidth: '20px 20px 0 0',
        borderColor: '#90ce59 transparent transparent transparent',
        position: 'absolute',
        top: '0',
        left: '0'     
    },

    obliviot_light_corner_lose: {
        width: '0',
        height: '0',
        borderStyle: 'solid',
        borderWidth: '20px 20px 0 0',
        borderColor: '#e85149 transparent transparent transparent',
        position: 'absolute',
        top: '0',
        left: '0'          
    },
    obliviot_light_bottom_nav: {
        width: '100%',
        marginTop: '30px'
    },

    obliviot_light_bottom_nav_logo: {
        width: '100%'
    },

    obliviot_light_bottom_nav_title: {
        width: '100%',
        textAlign: 'left',
        lineHeight: '30px',
        color: 'black',
        fontSize: '18px',
        fontWeight: '900'
    },

    obliviot_light_bottom_nav_sub: {
        width: '100%',
        textAlign: 'left',
        lineHeight: '30px',
        color: 'black',
        fontSize: '16px',
        fontWeight: 'medium'
    },

    obliviot_orgFooter: {
        textAlign: 'center',
        width: '100%',
        background: '#000000',
        padding: '20px',
    },
    obliviot_orgFooterText: {
        padding: '0',
        margin: '0',
        fontSize: '16px',
        fontWeight: '400',
        color: '#FFF'
    },



    // ***************************************************************
    // Felzec Theme
    // ***************************************************************

    felzec_lightBlogContainer: {
        width: '100%',
        display: 'table',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    felzec_lightBlogMobileContainer: {
        width: '90%',
        height: '200px',
        display: 'table',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px'
    },

    felzec_lightTeamContainer: {
        width: '100%',
        height: '500px',
        display: 'table',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    felzec_lightHeader: {
        width: '100%',
        maxHeight: '70px',
        backgroundColor: 'black',
        marginBottom: '-20px'
    },

    felzec_nav_constraint : {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        position: 'relative'
    },

    felzec_light_nav_logo_holder: {
        height: '70px',
        width: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: '70px'
    },

    felzec_light_nav_logo: {
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'inline-block',
        margin: '0 auto',
        verticalAlign: 'middle'
    },

    felzec_light_social_menu_item: {
        lineHeight: '70px',
        float: 'left',
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px'
    },

    felzec_light_navicon_menu_item: {
        lineHeight: '70px',
        float: 'right',
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px'
    },

    felzec_sponsor_box: {
        width: '100%',
        paddingTop: '56.25%',
        backgroundColor: '#040404',
        position: 'relative'
    },

    felzec_jumbotron_layer: {
       width: '100%',  
       paddingTop: '56.25%',
       position: 'absolute',
       bottom: '0px',
       height: '35%',
       background: 'rgb(4,4,4)',
       background: 'linear-gradient(0deg, rgba(4,4,4,1) 0%, rgba(4,4,4,.9) 20%, rgba(4,4,4,.6) 40%, rgba(4,4,4,0) 60%, rgba(4,4,4,0) 100%)'
    },

    felzec_sponsor_container: {
        width: '100%',
        height: '15%',
        position: 'absolute',
        paddingLeft: '10%',
        bottom: '20px'
    },

    obliviot_light_social_menu_container: {
        float: 'left',
        display: 'table',
        paddingTop: '0px',
        paddingLeft: '0px'
    },

    felzec_menu_container: {
        width: '100%',
        height: '60px',
        backgroundColor: 'rgb(131,24,39)',
        borderWidth: '2px 0px 0px 0px',
        borderStyle: 'solid',
        borderColor: 'rgba(255,255,255,.5)',
        position: 'absolute',
        bottom: '-48px',
        zIndex: '10'
    },

    felzec_footer_sponsor_container: {
        width: '100%',
        height: '60px',
        marginBottom: '19px',
        marginTop: '19px'
    },

    felzec_footer_sponsor_image: {
        maxHeight: '60px',
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    felzec_footer_mobile_sponsor_image: {
        maxHeight: '30px',
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    org_menu_felzec_light_item : {
        height: '60px',
        lineHeight: '60px',
        float: 'right',
        color: '#fefefe',
        fontSize: '18px',
        fontWeight: '900',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'transparent',
        position: 'relative',
        display: 'inline-block'
    },
    felzec_menu_felzec_light_item : {
        height: '25px',
        lineHeight: '25px',
        width: '100%',
        textAlign: 'right',
        float: 'right',
        color: 'white',
        fontSize: '18px',
        fontWeight: '900',
        cursor: 'pointer',
        padding: '0px 10px 0px 10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'transparent',
        position: 'relative'
    },

    felzec_footer_title_left: {
        width: '100%',
        lineHeight: '30px',
        height: '30px',
        textAlign: 'left',
        color: 'white',
        fontSize: '18px',
        fontWeight: '900'
    },

    felzec_footer_title_mobile_left: {
        width: '100%',
        lineHeight: '30px',
        height: '30px',
        textAlign: 'left',
        color: 'white',
        fontSize: '16px',
        fontWeight: '900'
    },

    felzec_footer_title_center: {
        width: '100%',
        lineHeight: '30px',
        height: '30px',
        textAlign: 'center',
        color: 'white',
        fontSize: '18px',
        fontWeight: '900'
    },

    felzec_footer_inner: {
        width: '90%'
    },

    felzec_footer_title_right: {
        width: '100%',
        lineHeight: '30px',
        height: '30px',
        textAlign: 'right',
        color: 'white',
        fontSize: '18px',
        fontWeight: '900'
    },

    felzec_footer_title_mobile_right: {
        width: '100%',
        lineHeight: '30px',
        height: '30px',
        textAlign: 'right',
        color: 'white',
        fontSize: '16px',
        fontWeight: '900'
    },

    felzec_footer_text_left : {
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        color: '#cdcdcd',
        fontSize: '16px',
        fontWeight: '400',
        textAlign: 'left',
        paddingBottom: '20px'
    },

    felzec_footer_email_left : {
        width: '100%',
        color: '#cdcdcd',
        fontSize: '16px',
        fontWeight: '400',
        textAlign: 'left',
        paddingBottom: '20px',
        cursor: 'pointer'
    },

    felzec_footer_text_right : {
        width: '100%',
        color: '#cdcdcd',
        fontSize: '16px',
        fontWeight: '400',
        textAlign: 'right',
        paddingBottom: '20px'
    },

    felzec_footer_email_right : {
        width: '100%',
        color: '#cdcdcd',
        fontSize: '16px',
        fontWeight: '400',
        textAlign: 'right',
        paddingBottom: '20px',
        cursor: 'pointer'
    },

    footer_menu_felzec_light_item: {
        width: '100%',
        lineHeight: '2.0em',
        textAlign: 'right',
        color: '#bbb',
        fontSize: '24px',
        fontWeight: '400',
        cursor: 'pointer'
    },

    felzec_darkFooter: {
        width: '100%',
        backgroundColor: '#040404',
        overflow: 'hidden'
    },

    felzec_roster_item_container: {
        width: '100%',
        height: '300px',
        position: 'relative',
        margin: '10px 0px 10px 0px',
        backgroundColor: '#040404'
    },

    felzec_sponser_item_img_container: {
        width: '125px',
        height: '300px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    felzec_roster_filter_container: {
        width: '100%',
        height: '300px',
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_roster_inner_container: {
        width: '60%',
        padding: '20px 0px 10px 0px',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '0',
        left: '20%'
    },

    felzec_roster_nav_container: {
        width: '40%',
        height: '40px',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: '20px',
        right: '20%'
    },

    felzec_sponsor_list_button: {
        width: '100%',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgb(235,51,61)',
        borderRadius: '5px'
    },

    felzec_sponsor_icon_container: {
        width: '100%',
        height: '40px',
        lineHeight: '40px',
        color: 'white'
    },
    
    felzec_roster_item_about_container: {
        width: '100%',
        height: '200px',
        padding: '10px 30px 0px 10px',
        textAlign: 'left',
        overflowY: 'auto',
        overflowX: 'none'
    },

    felzec_sponser_item_img: {
        maxHeight: '150px',
        maxWidth: '100%',
        marginTop: '70px'
    },

    felzec_roster_name: {
        fontSize: '36px',
        fontWeight: '900',
        color: 'white',
        wordBreak: 'break-all'
    },

    felzec_roster_about_text: {
        lineHeight: '20px',
        fontWeight: '400',
        color: 'white'
    },

    felzec_roster_item_name_container: {
        width: '100%',
        display: 'table',
        paddingBottom: '10px'
    },

    felzec_light_bg_img: {
        width: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px'
    },

    felzec_blog_container: {
        width: '100%',
        height: '600px',
        backgroundColor: '#040404',
        position: 'relative'
    },

    felzec_blog_m_container: {
        width: '100%',
        height: '240px',
        backgroundColor: '#040404',
        position: 'relative'
    },


    felzec_blog_mobile_container: {
        width: '100%',
        display: 'table',
        backgroundColor: '#040404',
        position: 'relative'
    },

    felzec_blog_filter_container: {
        width: '100%',
        height: '600px',
        backgroundColor: 'rgba(255,0,0,0)',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_blog_m_filter_container: {
        width: '100%',
        height: '240px',
        backgroundColor: 'rgba(255,0,0,0)',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_blog_inner_container: {
        width: '100%',
        height: '600px',
        padding: '50px 10% 50px 10%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_blog_mobile_inner_container: {
        width: '100%',
        height: '240px',
        padding: '20px 10px 20px 10px',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_matches_container: {
        width: '100%',
        height: '400px',
        backgroundColor: '#040404',
        position: 'relative'
    },

    felzec_matches_mobile_container: {
        width: '100%',
        height: '300px',
        backgroundColor: '#040404',
        position: 'relative'
    },

    felzec_matches_inner_container: {
        width: '100%',
        padding: '10px 10% 50px 10%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_team_container: {
        width: '100%',
        paddingTop: '30%',
        backgroundColor: '#040404',
        position: 'relative'
    },

    felzec_team_main_container: {
        width: '100%',
        display: 'table',
        backgroundColor: '#040404',
        position: 'relative'
    },

    felzec_staff_container: {
        width: '100%',
        height: '400px',
        backgroundColor: '#040404',
        position: 'relative'
    },

    felzec_staff_image_container: {
        width: '170px',
        height: '240px',
        float: 'left',
        marginLeft: '25px',
        marginRight: '25px',
        backgroundColor: 'rgb(230,230,230)',
        position: 'relative'
    },

    felzec_team_image_container: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },

    felzec_team_image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'relative'
    },

    felzec_staff_image: {
        width: '170px',
        height: '240px',
        objectFit: 'cover',
        position: 'relative'
    },

    felzec_team_overlay: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        position: 'absolute',
        zIndex: '10',
        top: '0px',
        left: '0px',
        backgroundColor: '#040404'
    },

    felzec_staff_overlay: {
        width: '140px',
        height: '240px',
        objectFit: 'contain',
        position: 'absolute',
        padding: '15px',
        zIndex: '10',
        top: '0px',
        left: '0px',
        backgroundColor: '#040404'
    },

    felzec_team_overlay_name: {
        lineHeight: '24px',
        padding: '15px 0px 0px 15px',
        width: '80%',
        fontSize: '20px',
        fontWeight: '900',
        textAlign: 'left',
        color: 'white',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    felzec_team_overlay_handle: {
        width: '100%',
        lineHeight: '22px',
        paddingLeft: '15px',
        fontSize: '18px',
        fontWeight: '900',
        textAlign: 'left',
        color: 'red'
    },

    felzec_team_overlay_button: {
        height: '30px',
        width: '100%',
        lineHeight: '30px',
        fontSize: '16px',
        textAlign: 'center',
        color: 'white',
        fontWeight: '100',
        cursor: 'pointer',
        position: 'absolute',
        bottom: '0px',
        left: '0',
        backgroundColor: 'blue'
    },

    felzec_team_inner_container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        padding: '1% 10% 1% 10%',
        position: 'absolute',
        top: '0%',
        left: '0%'
    },

    felzec_team_filter_container: {
        width: '100%',
        paddingTop: '30%',
        backgroundColor: 'rgba(255,0,0,0)',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_staff_inner_container: {
        width: '100%',
        height: '400px',
        padding: '0px 15% 50px 15%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_staff_inner_mobile_container: {
        width: '100%',
        height: '400px',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_staff_title: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        fontSize: '24px',
        fontWeight: '900',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'transparent'
    },

    felzec_staff_filter_container: {
        width: '100%',
        height: '400px',
        backgroundColor: 'rgba(255,0,0,0)',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_matches_inner_container: {
        width: '100%',
        height: '400px',
        padding: '10px 10% 50px 10%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_matches_mobile_inner_container: {
        width: '100%',
        padding: '10px 0% 30px 0%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_matches_filter_container: {
        width: '100%',
        height: '400px',
        backgroundColor: 'rgba(255,0,0,0)',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_matches_mobile_filter_container: {
        width: '100%',
        height: '300px',
        backgroundColor: 'rgba(255,0,0,0)',
        position: 'absolute',
        top: '0',
        left: '0'
    },

    felzec_match_element_container: {
        width: '100%',
        height: '340px',
        overflowY: 'auto',
        overflowX: 'hidden',
    },

    felzec_match_mobile_element_container: {
        width: '100%',
        height: '340px',
        overflowY: 'hidden',
        overflowX: 'hidden',
    },

    felzec_media_element_container: {
        width: '100%',
        height: '240px',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap'
    },

    felzec_match_info_container: {
        width: '100%',
        height: '100px',
        lineHeight: '100px',
        fontSize: '24px',
        fontWeight: '900',
        color: 'red',
        textAlign: 'center',
        cursor: 'pointer'
    },

    felzec_match_mobile_info_container: {
        width: '100%',
        height: '40px',
        lineHeight: '40px',
        fontSize: '24px',
        fontWeight: '900',
        color: 'red',
        textAlign: 'center',
        cursor: 'pointer'
    },

    felzec_matches_game: {
        width: '100%',
        lineHeight: '30px',
        fontSize: '18px',
        fontWeight: '900',
        color: 'red',
        textAlign: 'center'
    },

    felzec_matches_mobile_game: {
        width: '100%',
        lineHeight: '20px',
        fontSize: '18px',
        fontWeight: '900',
        color: 'red',
        textAlign: 'center'
    },

    felzec_matches_league: {
        width: '100%',
        lineHeight: '30px',
        fontSize: '24px',
        fontWeight: '900',
        color: 'white',
        textAlign: 'center'
    },

    felzec_matches_date: {
        width: '100%',
        lineHeight: '20px',
        fontSize: '14px',
        fontWeight: '900',
        color: 'white',
        textAlign: 'center'
    },

    felzec_switch_container: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '50px',
        marginBottom: '35px'
    },

    felzec_mobile_switch_container: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '30px'
    },

    felzec_switch_upcoming_container: {
        width: '49%',
        float: 'left',
        lineHeight: '50px',
        fontSize: '24px',
        textAlign: 'center',
        fontWeight: '900',
        height: '50px',
        backgroundColor: 'black',
        marginRight: '2%',
        color: '#cccccc',
        cursor: 'pointer'
    },

    felzec_switch_recent_container: {
        width: '49%',
        float: 'left',
        lineHeight: '50px',
        fontSize: '24px',
        textAlign: 'center',
        fontWeight: '900',
        height: '50px',
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer'
    },

    felzec_mobile_switch_upcoming_container: {
        width: '49%',
        float: 'left',
        lineHeight: '30px',
        fontSize: '14px',
        textAlign: 'center',
        fontWeight: '900',
        height: '30px',
        backgroundColor: 'black',
        marginRight: '2%',
        color: '#cccccc',
        cursor: 'pointer'
    },

    felzec_mobile_switch_recent_container: {
        width: '49%',
        float: 'left',
        lineHeight: '30px',
        fontSize: '14px',
        textAlign: 'center',
        fontWeight: '900',
        height: '30px',
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer'
    },

    felzec_light_match_container: {
        width: '100%',
        padding: '10px 0px 10px 0px',
        borderBottom: '1px solid rgba(255,255,255,.5)'
    },

    felzec_light_match_vs_image_container: {
        width: '70px',
        height: '70px',
        lineHeight: '70px',
        marginTop: '15px',
        float: 'left'
    },

    felzec_light_match_vs_image: {
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'inline-block',
        margin: '0 auto',
        verticalAlign: 'middle'
    },

    felzec_light_mobile_match_vs_image: {
        width: '70px',
        height: '70px',
        backgroundColor: 'rgba(0,0,0,0)',
        float: 'left'
    },

    felzec_light_match_vs_score: {
        width: '80px',
        height: '100px',
        lineHeight: '100px',
        textAlign: 'center',
        color: 'white',
        fontSize: '24px',
        fontWeight: '900',
        float: 'left'
    },

    felzec_light_mobile_match_vs_score: {
        width: '80px',
        height: '70px',
        lineHeight: '70px',
        textAlign: 'center',
        color: 'white',
        fontSize: '24px',
        fontWeight: '900',
        float: 'left'
    },

    felzec_game_container: {
        width: '100%',
        height: '20%',
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '-17px',
        whiteSpace: 'nowrap',
        boxSizing: 'content-box'
    },

    felzec_teammate_container: {
        width: '100%',
        height: '65%',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: '-17px',
        marginTop: '40px',
        whiteSpace: 'nowrap',
        boxSizing: 'content-box'
    },

    felzec_coworker_container: {
        width: '100%',
        height: '240px',
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '-17px',
        marginTop: '50px',
        whiteSpace: 'nowrap',
        boxSizing: 'content-box'
    },

    felzec_team_game_container: {
        height: '100%',
        marginRight: '30px',
        marginLeft: '30px',
        float: 'left',
    },

    felzec_team_game_media: {
        height: '100%',
        objectFit: 'fill'
    },

    felzec_lightBlogMaxContainer: {
        width: '100%',
        height: '500px',
        position: 'relative',
        cursor: 'pointer'
    },

    felzec_main_news_item_image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },

    felzec_lightBlogMiniContainer: {
        width: '100%',
        height: '245px',
        marginBottom: '10px',
        position: 'relative',
        cursor: 'pointer'
    },

    felzec_main_news_item_mini_image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },

    felzec_light_twitch_feed_container: {
        width: '426px',
        height: '240px',
        backgroundColor: 'rgba(0,0,0,.1)',
        position: 'relative',
        float: 'left',
        marginRight: '6px'
    },

    felzec_twitch_thumbnail: {
        width: '416px',
        height: '240px',
        objectFit: 'fill'
    },

    felzec_twitch_overlay: {
        width: '426px',
        height: '20px',
        backgroundColor: 'rgba(0,0,0,.7)',
        position: 'absolute',
        top: '0px',
        left: '0px',
        paddingLeft: '10px',
        paddingRight: '10px',
        textAlign: 'left'
    },

    felzec_light_twitch_title_container: {
        width: '100%',
        padding: '0px 0px 10px 20px',
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        textAlign: 'left'
    },

    felzec_twitch_overlay_text: {
        height: '20px',
        lineHeight: '20px',
        fontSize: '16px',
        fontWeight: '900',
        color: 'white'
    },

    felzec_twitch_overlay_status: {
        width: '18px',
        height: '18px',
        position: 'absolute',
        top: '2px',
        right: '10px',
        borderRadius: '9px',
        backgroundColor: 'red'
    },

    felzec_light_twitch_title: {
        color: 'black',
        fontSize: '18px',
        fontWeight: '900',
        textAlign: 'left',
        lineHeight: '22px',
        width: '100%'
    },

    felzec_light_twitch_subtitle: {
        color: 'black',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: '18px',
        width: '100%'
    },

    felzec_dark_twitch_left_arrow: {
        height: '50px',
        width: '50px',
        textAlign: 'center',
        lineHeight: '50px',
        color: 'white',
        fontSize: '20px',
        fontWeight: '900',
        backgroundColor: 'rgba(0,0,0,.8)',
        position: 'absolute',
        zIndex: '100',
        top: '150px',
        left: '0px',
        cursor: 'pointer'
    },

    felzec_dark_twitch_right_arrow: {
        height: '50px',
        width: '50px',
        textAlign: 'center',
        lineHeight: '50px',
        color: 'white',
        fontSize: '20px',
        fontWeight: '900',
        backgroundColor: 'rgba(0,0,0,.8)',
        position: 'absolute',
        zIndex: '100',
        top: '150px',
        right: '0px',
        cursor: 'pointer'
    },

    felzec_light_news_row: {
        width: '100%',
        height: '200px',
        marginTop: '10px',
        position: 'relative'
    },

    felzec_light_mobile_news_row: {
        width: '100%',
        height: '100px',
        marginTop: '10px',
        position: 'relative'
    },

    felzec_light_footer_news_row: {
        width: '100%',
        height: '100px',
        marginTop: '15px',
        position: 'relative',
        display: 'table'
    },

    felzec_light_news_container: {
        width: '80%',
        height: '200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(255,255,255,1)',
        position: 'relative',
        cursor: 'pointer'
    },

    felzec_light_news_mobile_container: {
        width: '90%',
        height: '100px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(255,255,255,1)',
        position: 'relative',
        cursor: 'pointer'
    },

    felzec_light_news_footercontainer: {
        width: '100%',
        height: '100px',
        backgroundColor: 'transparent',
        position: 'relative',
        cursor: 'pointer'
    },

    felzec_main_news_item_micro_image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    },

    felzec_main_news_item_micro_mobile_image: {
        width: '100%',
        height: '100px',
        objectFit: 'cover'
    },

    felzec_main_footer_news_item_micro_image: {
        width: '100%',
        height: '100px',
        objectFit: 'cover'
    },

    felzec_light_news_title: {
        textAlign: 'left',
        fontSize: '20px',
        lineHeight: '30px',
        color: 'black',
        fontWeight: '900',
        textTransform: 'uppercase'
    },

    felzec_light_mobile_news_title: {
        textAlign: 'left',
        fontSize: '20px',
        lineHeight: '25px',
        color: 'black',
        fontWeight: '900',
        textTransform: 'uppercase'
    },

    felzec_light_footer_news_title: {
        textAlign: 'left',
        fontSize: '14px',
        lineHeight: '20px',
        marginTop: '10px',
        color: 'white',
        fontWeight: '900',
        textTransform: 'uppercase'
    },

    felzec_light_news_body: {
        textAlign: 'left',
        fontSize: '14px',
        color: 'black',
        fontWeight: 'bold',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    felzec_light_footer_news_body: {
        textAlign: 'left',
        fontSize: '12px',
        color: 'red',
        fontWeight: 'bold',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    felzec_modal_inner: {
        width: '80%',
        padding: '15px',
        display: 'table',
        background: 'white',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    felzec_news_modal_title_text: {
        fontSize: '24px',
        fontWeight: 'bold',
        float: 'left',
        color: 'black'
    },
    felzec_news_modal_date_text: {
        fontSize: ' 18px',
        fontWeight: 'bold',
        float: 'right',
        color: 'black'
    },

    felzec_modal_news_body_text: {
        width: '100%',
        height: '100%',
        color: 'black',
        overflowY: 'scroll'
    },

    felzec_about_header: {
        width: '100%',
        height: '300px',
        backgroundColor: 'blue'
    },

    felzec_about_container: {
        width: '100%',
        padding: '20px 15% 20px 15%'
    },

    felzec_about_mobile_container: {
        width: '100%',
        padding: '0px 0% 0px 0%'
    },

    felzec_about_desc_conatiner: {
        width: '100%',
        minHeight: '500px',
        backgroundColor: 'black',
        position: 'relative'
    },

    felzec_about_container_inner: {
        width: '100%',
        minHeight: '400px',
        backgroundColor: 'rgba(0,0,0,.85)',
        padding: '20px'
    },

    felzec_about_container_lower: {
        width: '100%',
        height: '100px',
        backgroundColor: 'rgba(211,45,54,.85)',
        padding: '10px'
    },

    felzec_about_title: {
        color: 'white',
        width: '100%',
        fontSize: '24px',
        fontWeight: '900',
        lineHeight: '35px'
    },

    felzec_about_text: {
        color: 'white',
        width: '100%',
        fontSize: '16px',
        fontWeight: '400',
    },

    light_roster_item_container: {
        width: '70px',
        height: '100px',
        display: 'table',
        borderColor: 'rgba(0,0,0,.2)',
        borderRadius: '10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        padding: '30px 0px 30px 0px',
        margin: '10px 0px 10px 0px'
    },

    felzec_lower_about_title: {
        width: '100%',
        lineHeight: '25px',
        paddingLeft: '10px',
        color: 'white',
        fontSize: '24px',
        fontWeight: '900'
    },

    felzec_lower_about_text: {
        width: '100%',
        lineHeight: '20px',
        paddingLeft: '10px',
        paddingRight: '10px',
        color: 'white',
        fontSize: '16px'
    },

    felzec_about_email_title: {
        width: '100%',
        lineHeight: '20px',
        fontSize: '18px',
        color: 'white',
        fontWeight: '900'
    },

    felzec_about_email_title: {
        width: '100%',
        lineHeight: '6px',
        fontSize: '14px',
        color: 'white',
        fontWeight: '900'
    },

    felzec_about_email_text: {
        width: '100%',
        lineHeight: '20px',
        fontSize: '16px',
        color: 'red',
        fontWeight: '300'
    },

    felzec_about_mobile_email_text: {
        width: '100%',
        lineHeight: '20px',
        fontSize: '14px',
        marginTop: '3px',
        color: 'red',
        fontWeight: '300'
    },

    felzec_lower_email_button: {
        backgroundColor: 'black',
        padding: '8px',
        width: '180px',
        height: '60px',
        float: 'left',
        marginRight: '20px',
        marginTop: '10px',
        cursor: 'pointer'
    },

    felzec_lower_mobile_email_button: {
        backgroundColor: 'black',
        padding: '8px',
        width: '180px',
        height: '35px',
        float: 'left',
        marginBottom: '10px',
        cursor: 'pointer'
    },

    felzec_orgFooter: {
        textAlign: 'center',
        width: '100%',
        background: '#000000',
        padding: '20px',
    },
    felzec_orgFooterText: {
        width: '100%',
        height: '20px',
        textAlign: 'right',
        lightHeight: '20px',
        fontSize: '16px',
        fontWeight: '400',
        color: '#FFF'
    },

    // ***************************************************************
    // admin_navigate_button
    //****************************************************************

    admin_navigate_button: {
        position: 'absolute',
        padding: '10px 20px 10px 20px',
        top: '16px',
        right: '370px',
        backgroundColor: 'blue',
        color: 'white',
        fontSize: '20px',
        fontWeight: '900',
        cursor: 'pointer'
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
    dark_mobile_submenu_item_box: {
        width: '100%',
        height: '50px',
        color: 'rgba(255,255,255,.9)',
        lineHeight: '50px',
        paddingLeft: '30px',
        fontSize: '.9em'
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
        backgroundColor: 'rgb(0,0,0)',
        padding: '0px 0px 0px 0px'
    },
    lightBG: {
        width: '100%',
        backgroundColor: 'rgb(255,255,255)',
        padding: '0px 0px 0px 0px'
    },
    blankBG: {
        width: '100%',
        backgroundColor: 'rgba(20,20,20,0)',
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
        minHeight: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: 'transparent',
    },
    darkHeader: {
        width: '100%',
        padding: '15px 20px 15px 20px',
        minHeight: '40px',
        position: 'fixed',
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
        padding: '0px 2px 0px 2px',
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

    dark_recent_matches_element_container: {
        width: '100%',
        display: 'table',
        paddingTop: '5px',
        paddingBottom: '5px'
    },

    dark_recent_matches_element_title_container: {
        width: '100%',
        height: '50px',
        display: 'table',
        borderBottom: '2px solid white'
    },

    dark_recent_matches_element_image_container: {
        width: '100%',
        position: 'relative',
        display: 'table'
    },

    dark_recent_matches_element_image: {
        width: '40px',
        height: '40px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    dark_recent_matches_element_title: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center',
        fontSize: '20',
        color: 'white',
        display: 'tble'
    },
    dark_recent_matches_element_score: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center',
        fontSize: '16',
        color: 'white',
        display: 'table'
    },
    light_recent_matches_element_title: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center',
        fontSize: '20',
        color: 'black',
        display: 'tble'
    },
    light_recent_matches_element_score: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center',
        fontSize: '16',
        color: 'black',
        display: 'table'
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
        height: '35px',
        cursor: 'pointer'
    },
    felzec_header_logo: {
        display: 'block',
        margin: 'auto',
        height: '50px',
        cursor: 'pointer'
    },
    body_container: {
        width: '100%',
        display: 'table',
        padding: '0px 15px 0px 15px',
        background: 'transparent'
    },
    roster_body_container: {
        width: '100%',
        height: '100%',
        display: 'table',
        padding: '100px 15px 0px 15px',
        background: 'black'
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
    dark_roster_item_container: {
        width: '100%',
        display: 'table',
        borderColor: 'rgba(255,255,255,.2)',
        borderRadius: '10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        padding: '30px 0px 30px 0px',
        margin: '10px 0px 10px 0px'
    },
    light_roster_item_container: {
        width: '100%',
        display: 'table',
        borderColor: 'rgba(0,0,0,.2)',
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
        marginRight: 'auto'
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
        display: 'table',
        paddingTop: '20px',
        paddingBottom: '20px'
    },
    roster_name: {
        fontSize: '36px',
        fontWeight: '900',
        color: 'white',
        wordBreak: 'break-all'
    },
    dark_roster_name: {
        fontSize: '36px',
        fontWeight: '900',
        color: 'white',
        wordBreak: 'break-all'
    },
    light_roster_name: {
        fontSize: '36px',
        fontWeight: '900',
        color: 'black',
        wordBreak: 'break-all'
    },
    roster_divider: {
        lineHeight: '80px',
        fontSize: '48px',
        fontWeight: '900',
        color: 'white',
        marginLeft: '10px',
        marginRight: '10px'
    },
    dark_roster_divider: {
        lineHeight: '80px',
        fontSize: '48px',
        fontWeight: '900',
        color: 'white',
        marginLeft: '10px',
        marginRight: '10px'
    },
    light_roster_divider: {
        lineHeight: '80px',
        fontSize: '48px',
        fontWeight: '900',
        color: 'black',
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
    dark_roster_item_social_icon: {
        width: '40px',
        height: '40px',
        lineHeight: '40px',
        color: 'white',
        fontSize: '24px',
        textAlign: 'center',
        float: 'left'
    },
    light_roster_item_social_icon: {
        width: '40px',
        height: '40px',
        lineHeight: '40px',
        color: 'black',
        fontSize: '24px',
        textAlign: 'center',
        float: 'left'
    },
    roster_about_text: {
        lineHeight: '25px',
        fontWeight: '400',
        color: 'rgba(255,255,255,.8)'
    },
    dark_roster_about_text: {
        lineHeight: '25px',
        fontWeight: '400',
        color: 'rgba(255,255,255,.8)'
    },
    light_roster_about_text: {
        lineHeight: '25px',
        fontWeight: '400',
        color: 'rgba(0,0,0,.8)'
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
        width: '100%',
        height: '50px',
        float: 'left',
        display: 'table'
    },
    nav_right: {
        width: '100%',
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
        height: '20px'
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
        height: '20px'
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
    individual_image_label: {
        backgroundColor: 'transparent',
        color: '#fff',
        padding: '5px 10px 5px 10px',
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: '4px',
        borderWidth: '1px',
        marginTop: '10px',
        cursor: 'pointer'
    },
    individual_twitch_image_holder: {
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    individual_twitch_image: {
        width: '80px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    admin_sponser_image_box: {
        width: '150px',
        height: '100px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '20px',
        backgroundColor: '#ccc'
    },
    admin_sponser_bg_image_box: {
        width: '300px',
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
    admin_sponser_bg_image: {
        width: '300px',
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
        padding: '20px 15px 50px 15px'
    },
    modal_about_body: {
        width: '100%',
        padding: '20px 15px 20px 15px',
        overflow: 'hidden'
    },
    modal_news_body_text: {
        width: '100%',
        height: '100%',
        color: 'white',
        overflowY: 'scroll'
    },
    dark_modal_news_body_text: {
        width: '100%',
        height: '100%',
        color: 'white',
        overflowY: 'scroll'
    },
    light_modal_news_body_text: {
        width: '100%',
        height: '100%',
        color: 'black',
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
    dark_modal_about_header: {
        width: '100%',
        height: '120px',
        lineHeight: '120px',
        textAlign: 'left',
        color: 'white',
        fontSize: '48px'
    },
    light_modal_about_header: {
        width: '100%',
        height: '120px',
        lineHeight: '120px',
        textAlign: 'left',
        color: 'black',
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
    team_add_actions: {
        display: 'table',
        padding: '20px 0px 20px 0px',
        float: 'right'
    },
    admin_roster_back: {
        padding: '10px 30px 10px 30px',
        borderRadius: '5px',
        borderColor: '#cdcdcd',
        borderWidth: '1px',
        borderStyle: 'solid',
        backgroundColor: '#dddddd',
        color: 'white',
        fontSize: '18px',
        fontWeight: '900',
        cursor: 'pointer'
    },
    theme_type_container: {
        width: '100%',
        display: 'table',
        padding: '20px 0px 20px 0px'
    },
    admin_theme_display_container: {
        float: 'left',
        width: '100px',
        height: '200px',
        borderStyle: 'solid',
        borderWidth: '4px',
        borderColor: 'blue',
        cursor: 'pointer',
        marginRight: '10px',
        marginLeft: '10px',
        display: 'table',
        position: 'relative',
    },
    admin_theme_display_image: {
        width: '150px',
        height: '300px',
        cursor: 'pointer',
        objectFit: 'cover'
    },
    admin_theme_display_text: {
        position: 'absolute',
        width: '100%',
        height: '20px',
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white',
        lineHeight: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        bottom: '0px',
        left: '0px',
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
        padding: '0px 0% 0px 0%',
        display: 'table'
    },
    individual_inner_bg: {
        width: '80%',
        minWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
        minHeight: '100vh',
        backgroundColor: 'rgb(35,35,35)',
        display: 'table',
        padding: '0px 25px 0px 0px'
    },
    individual_header: {
        width: '100%',
        height: '400px',
        position: 'relative',
        backgroundColor: '#000',
    },
    individual_header_image: {
        width: '100%',
        height: '400px',
        objectFit: 'cover'
    },
    individual_edit_button: {
        height: '40px',
        lineHeight: '40px',
        padding: '0px 20px 0px 20px',
        fontSize: '18px',
        fontWeight: '900',
        borderColor: 'white',
        borderWidth: '1px',
        borderRadius: '5px',
        borderStyle: 'solid',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '20px',
        right: '120px'
    },
    individual_login_button: {
        height: '40px',
        lineHeight: '40px',
        padding: '0px 20px 0px 20px',
        fontSize: '18px',
        fontWeight: '900',
        borderColor: 'white',
        borderWidth: '1px',
        borderRadius: '5px',
        borderStyle: 'solid',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '20px',
        right: '20px'
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
        minHeight: '250px',
        maxHeight: '761px',
        overflowY: 'auto',
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
        minHeight: '580px',
        maxHeight: '600px',
        borderStyle: 'solid',
        borderColor: 'rgb(56,56,56)',
        borderWidth: '1px',
        marginBottom: '8px'
    },
    individual_label: {
        width: '100',
        paddingTop: '10px',
        color: 'white',
        fontSize: '16px',
        textAlign: 'left'
    },
    individual_social_header: {
        margin: '0 0 0 0',
        padding: '13px 15px 12px 15px',
        background: '#127f93',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        borderRadius: '0px 0px 0px 0px',
        cursor: 'pointer'
    },
    individual_social_content: {
        width: '100%',
        padding: '20px 0px 20px 0px'
    },
    individual_social_empty: {
        width: '100%',
        textAlign: 'center',
        padding: '5px 0px 5px 0px',
        color: 'white',
        fontSize: '14px'
    },
    indiviual_stats_container: {
        width: '100%',
        maxHeight: '100px',
        overflowY: 'auto',
        padding: '20px 10px 20px 10px',
        borderBottom: "1px rgba(255,255,255,.1) solid"
    },
    indiviual_stats_description_container: {
        width: '100%',
        maxHeight: '222px',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '20px 10px 20px 10px',
        borderBottom: "1px rgba(255,255,255,.1) solid"
    },
    individual_stats_title: {
        color: 'white',
        fontSize: '16px',
        lineHeight: '30px',
        fontWeight: '900'
    },
    individual_stats_data: {
        color: 'rgba(255,255,255,.9)',
        fontSize: '24px',
        lineHeight: '30px',
        fontWeight: '300',
        float: 'right'
    },
    individual_youtube_container: {
        width: '100%',
        height: '300px',
        backgroundColor: 'red',
        float: 'left'
    },
    modal_edit_image_container: {
        width: '100px',
        height: '100px',
        borderRadius: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '30px',
        marginTop: '30px'
    },
    modal_edit_image: {
        width: '100px',
        height: '100px',
        borderRadius: '5px'
    },
    modal_edit_banner_container: {
        width: '300px',
        height: '100px',
        borderRadius: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '30px'
    },
    modal_edit_banner: {
        width: '300px',
        height: '100px',
        borderRadius: '5px'
    },
    modal_edit_image_upload: {
        width: '300px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
    },
    modal_individual_edit_body: {
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        display: 'table',
        padding: '20px 10px 20px 10px'
    },
    modal_individual_edit_input: {
        width: '100%',
        padding: '5px 10px 5px 10px',
        color: 'white',
        borderColor: 'white',
        borderWidth: '1px',
        borderRadius: '5px',
        borderStyle: 'solid',
        marginTop: '10px',
        marginBottom: '10px',
        lineHeight: '30px',
        fontSize: '18px',
        backgroundColor: 'transparent',
        fontFamily: 'Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif'
    },
    modal_individual_edit_about: {
        width: '100%',
        padding: '5px 10px 5px 10px',
        color: 'white',
        borderColor: 'white',
        borderWidth: '1px',
        borderRadius: '5px',
        borderStyle: 'solid',
        marginTop: '10px',
        marginBottom: '10px',
        lineHeight: '1.2',
        fontSize: '18px',
        backgroundColor: 'transparent',
        fontFamily: 'Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif'
    },
    modal_individual_submit_button_container: {
        width: '50%',
        height: '80px',
        float: 'left',
        paddingTop: '20px'
    },
    modal_individual_submit_button: {
        height: '40px',
        lineHeight: '40px',
        width: '95%',
        fontSize: '18px',
        fontWeight: '900',
        borderColor: 'white',
        borderWidth: '1px',
        borderRadius: '5px',
        borderStyle: 'solid',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
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
        background: 'linear-gradient(#061216, #3d4344)'
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
        padding: '30px',
        display: 'table'
    },
    landing_upcoming_content_container: {
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
        position: 'relative'
    },
    landing_welcome_container: {
        width: '100%',
        height: '100vh',
        paddingTop: '250px',
        backgroundImage: 'url("./../../images/banner-bg.jpg")',
        backgroundRepeat: 'auto',
        backgroundSize: 'auto'
    },
    landing_welcome_lines_container: {
        width: '100%',
        display: 'table',
        backgroundImage: 'url("./../../images/title-bg.png")',
        objectFit: 'fill'
    },
    landing_welcome_lines_image: {
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%'
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
        height: '50px',
        lineHeight: '50px',
        color: '#fff',
        display: 'table',
        fontSize: '48px',
        fontWeight: 'bold',
        padding: '0px 30px 0px 30px',
        opacity: '0',
        marginBottom: '20px'
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
        opacity: '0',
        paddingTop: '70px',
        textAlign: 'center'
    },
    landing_why_header: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        color: '#0a9ab4',
        fontSize: '48px',
        fontWeight: 'bold'
    },
    landing_why_body: {
        width: '100%',
        color: '#ffffff',
        fontSize: '36px',
        paddingTop: '75px',
        textAlign: 'left'
    },
    landing_individual_image_container: {
        padding: '15px',
        display: 'table'
    },
    landing_individual_image: {
        width: '100%'
    },
    coming_soon_div: {
        width: '100%',
        height: '100px',
        lineHeight: '100px',
        color: '#0a9ab4',
        textAlign: 'center',
        fontSize: '96px',
        fontWeight: 'bold',
        position: 'absolute',
        top: '30%'
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
        color: '#ffffff',
        paddingRight: '15px'
    },
    landing_upcoming_video: {
        padding: '130px 0px 100px 0px'
    },
    landing_upcoming_video_container: {
        position: 'relative',
        paddingBottom: '56.25%',
        paddingTop: '25px',
        height: '0'
    },
    landing_upcoming_video_iframe: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
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


