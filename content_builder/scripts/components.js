
var reacterminator = require('reacterminator');
const prettydiff = require('prettydiff');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs-extra')



const component_array = [
    { source_html: './src/html/themes/base/CredentialsComponent.html', sub_dir: 'signup' },
    { source_html: './src/html/themes/base/SignupComponent.html', sub_dir: 'signup' },
    { source_html: './src/html/themes/base/SignupChoiceComponent.html', sub_dir: 'signup' },
    { source_html: './src/html/themes/base/LoginComponent.html', sub_dir: 'signup' },
    { source_html: './src/html/themes/base/CreateSubDomainComponent.html', sub_dir: 'signup' },
    { source_html: './src/html/themes/base/PaywallComponent.html', sub_dir: 'signup' },

    { source_html: './src/html/themes/enigma/dark/OrganizationAboutModalComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationNewsModuleComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationNewsModalComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationPageComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationVideoComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationMatchesComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationMatchesComponentElement.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationTwitterComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationNewsComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationSponserComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationSponserComponentElement.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationNavComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationLogoComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationMobileMenuComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationMobileSubMenuComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationMobileNavComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationRosterItemComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationRosterPageComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationAboutItemComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationAboutPageComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationSponsersItemComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationSponsersPageComponent.html', sub_dir: 'themes/enigma/dark' },
    { source_html: './src/html/themes/enigma/dark/OrganizationEmailComponent.html', sub_dir: 'themes/enigma/dark' },

    { source_html: './src/html/themes/enigma/light/OrganizationAboutModalComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationNewsModuleComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationNewsModalComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationPageComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationVideoComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationMatchesComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationMatchesComponentElement.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationTwitterComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationNewsComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationSponserComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationSponserComponentElement.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationNavComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationLogoComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationMobileMenuComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationMobileSubMenuComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationMobileNavComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationRosterItemComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationRosterPageComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationAboutItemComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationAboutPageComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationSponsersItemComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationSponsersPageComponent.html', sub_dir: 'themes/enigma/light' },
    { source_html: './src/html/themes/enigma/light/OrganizationEmailComponent.html', sub_dir: 'themes/enigma/light' },

    { source_html: './src/html/themes/obliviot/dark/OrganizationAboutModalComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationNewsModuleComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationNewsModalComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationPageComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationVideoComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationMatchesComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationMatchesComponentElement.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationStitchComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationTwitchComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationTwitchHolderComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationNewsComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationInfoComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationBlogComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationBlogMobileComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationBlogModuleComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationSponserComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationSponserComponentElement.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationNavComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationMobileMenuComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationMobileSubMenuComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationMobileNavComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationSponsersItemComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationSponsersPageComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationRosterItemComponent.html', sub_dir: 'themes/obliviot/dark' },
    { source_html: './src/html/themes/obliviot/dark/OrganizationEmailComponent.html', sub_dir: 'themes/obliviot/dark' },

    { source_html: './src/html/themes/obliviot/light/OrganizationAboutModalComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationNewsModuleComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationNewsModalComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationPageComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationVideoComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationMatchesComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationMatchesComponentElement.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationStitchComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationTwitchComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationTwitchHolderComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationNewsComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationInfoComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationBlogComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationBlogMobileComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationBlogModuleComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationSponserComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationSponserComponentElement.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationNavComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationMobileMenuComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationMobileSubMenuComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationMobileNavComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationSponsersItemComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationSponsersPageComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationRosterItemComponent.html', sub_dir: 'themes/obliviot/light' },
    { source_html: './src/html/themes/obliviot/light/OrganizationEmailComponent.html', sub_dir: 'themes/obliviot/light' },

    { source_html: './src/html/themes/felzec/light/OrganizationAboutModalComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationAboutModalMobileComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationNewsModuleComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationNewsModalComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationPageComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationVideoComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationYouTubeComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationMatchesComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationMatchesMobileComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationMediaComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationMatchesComponentElement.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationMatchesMobileComponentElement.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationStitchComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationTwitchComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationTwitchHolderComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationNewsComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationNewsMobileComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationFooterNewsComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationFooterComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationFooterMobileComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationBlogComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationBlogMobileComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationTeamComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationTeamGameComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationTeamImageComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationBlogModuleComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationSponserComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationSponserComponentElement.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationNavComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationMobileMenuComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationMobileSubMenuComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationMobileNavComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationSponsersItemComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationSponsersPageComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationRosterItemComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationRosterItemMobileComponent.html', sub_dir: 'themes/felzec/light' },
    { source_html: './src/html/themes/felzec/light/OrganizationEmailComponent.html', sub_dir: 'themes/felzec/light' },

    { source_html: './src/html/themes/enigma2/dark/OrganizationAboutModalComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationAboutModalMobileComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationNewsModuleComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationNewsModalComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationPageComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationVideoComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationYouTubeComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationMatchesComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationEmailComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationMatchesMobileComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationMediaComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationMatchesComponentElement.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationMatchesMobileComponentElement.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationStitchComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationTwitchComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationTwitchHolderComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationNewsComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationNewsMobileComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationFooterNewsComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationFooterComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationFooterMobileComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationBlogComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationBlogMobileComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationTeamComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationTeamGameComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationTeamImageComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationBlogModuleComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationSponserComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationSponserComponentElement.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationNavComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationMobileMenuComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationMobileSubMenuComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationMobileNavComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationSponsersItemComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationSponsersPageComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationRosterItemComponent.html', sub_dir: 'themes/enigma2/dark' },
    { source_html: './src/html/themes/enigma2/dark/OrganizationRosterItemMobileComponent.html', sub_dir: 'themes/enigma2/dark' },

    { source_html: './src/html/themes/mobile/dark/OrganizationAboutModalComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationNewsModuleComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationNewsModalComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationPageComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationVideoComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationMatchesComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationMatchesComponentElement.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationStitchComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationTwitchComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationTwitchHolderComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationNewsComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationInfoComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationBlogComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationBlogMobileComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationBlogModuleComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationSponserComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationSponserComponentElement.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationNavComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationMobileMenuComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationMobileSubMenuComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationMobileNavComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationSponsersItemComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationSponsersPageComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationRosterItemComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationEmailComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationRosterItemMobileComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationFooterNewsComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationFooterComponent.html', sub_dir: 'themes/mobile/dark' },
    { source_html: './src/html/themes/mobile/dark/OrganizationFooterMobileComponent.html', sub_dir: 'themes/mobile/dark' },
    

    { source_html: './src/html/themes/admin/OrganizationAdminPageComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminProfileComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminUserComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminAboutComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminMatchesComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminMediaComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminMenuComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminRosterComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminRosterSocialStatsComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminStaffComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminSponserComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminSponserComponentElement.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminThemeComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminThemeModalComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminNewThemeComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminBlogComponent.html', sub_dir: 'admin' },
    { source_html: './src/html/themes/admin/OrganizationAdminCollaboratorComponent.html', sub_dir: 'admin' },
    
    { source_html: './src/html/themes/individual/IndividualPageComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/themes/individual/IndividualMobilePageComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/themes/individual/IndividualBasicInfoComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/themes/individual/IndividualSocialStatsComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/themes/individual/IndividualYoutubeStatsComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/themes/individual/IndividualTwitchStatsComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/themes/individual/IndividualTwitterStatsComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/themes/individual/IndividualInstagramStatsComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/themes/individual/IndividualEditModalComponent.html', sub_dir: 'individual' },
    { source_html: './src/html/themes/individual/IndividualVideosComponent.html', sub_dir: 'individual' },
]
let p = component_array.length;
const p_array = [];
for (var index in component_array) {
    (function (element) {
        fs.readFile(element.source_html, (err, data) => {
            if (err) {
                throw err;
            }
            p--;
            const $ = cheerio.load(data);

            $.root().find('*').contents().filter(() => { return this.type === 'comment'; }).remove();
            const x = $.root().html();
            p_array.push({ fn: element.source_html, sd: element.sub_dir, ht: $.root().html() });
            if (p === 0) {
                let new_len = p_array.length;
                p_array.forEach((d) => {
                    const components = reacterminator(
                        {
                            type: 'string',
                            content: d.ht.toString()
                        },
                        {
                            generatefiles: true,
                            customize: false
                        }
                    );

                    for (let key in components) {
                        if (key !== 'App') {

                            const imp = `/* eslint-disable */\nimport React, { Component } from 'react';
                        import injectSheet from 'react-jss';
                        import PropTypes from 'prop-types';
                        import { GlobalStyles } from 'Theme/Theme';
                        

                        class ${key}Render extends Component {\nrender() {\n    return(\n${components[key].jsxSnippet})}}\n\n
                        
                        ${key}Render.propTypes = {
                            classes: PropTypes.object.isRequired
                        };
                        
                        export default injectSheet(GlobalStyles)(${key}Render)`;

                            const regex = /className="(classes.*?)"/gi;
                            let new_output = imp.replace(regex, "className={this.props.$1}");

                            const regex2 = /src=(["'])(?:(?=(\\?))\2.)*?\1/g;
                            let new_output2 = new_output.replace(regex2, "");

                            const regex3 = /onchange=(["'])(?:(?=(\\?))\2.)*?\1/g;
                            let new_output3 = new_output2.replace(regex3, "");

                            const args = {
                                source: new_output3,
                                mode: 'beautify',
                                bracepadding: true,
                                lang: 'jsx',
                                wrap: '0',
                                preserve: '1'

                            }
                            const output = prettydiff.api(args);
                            const bn = path.basename(d.fn).slice(0, -5);
                            const final_dir = path.join('./src/components/', d.sd);
                            const final_output = path.join('./src/components/', d.sd, `/${bn}Render.js`)

                            fs.ensureDir(final_dir, err => {
                                console.log(`${d.fn} - Converted to: ${ final_output }`);
                                fs.writeFile(final_output, output[0], function (err) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    new_len--;
                                    if (new_len === 0) {
                                        return console.log('Finished...');
                                    }
                                });
                                // dir has now been created, including the directory it is to be placed in
                            })
                            
                        }
                    }

                });

            } (element)
            // You can use 'filename' here as well.
        });
    }(component_array[index]));
}




// let gr = $.html();
// gr = gr.replace(/classname=/g, 'className=')
// gr = gr.replace(/<html>/g, '')
// gr = gr.replace(/<\/html>/g, '')
// gr = gr.replace(/<head>/g, '')
// gr = gr.replace(/<\body>/g, '')
// gr = gr.replace(/<\/body>/g, '')
// gr = gr.replace(/data-insert-props="{/g, '')
// console.log(gr);
