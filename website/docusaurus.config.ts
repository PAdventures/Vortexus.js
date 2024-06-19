import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { convertNpmToPackageManagers } from '@sapphire/docusaurus-plugin-npm2yarn2pnpm';
import { ts2esm2cjs } from '@sapphire/docusaurus-plugin-ts2esm2cjs';

const baseTypedocOptions = {
    includeVersion: true,
    fileExtension: '.md',
    excludeExternals: true,
	expandParameters: true,
	parametersFormat: 'list',
	enumMembersFormat: 'list',
	indexFormat: 'list'
}

const config: Config = {
	title: 'Vortexus.js',
	tagline: 'Vortexus.js is a complex and flexible Discord.js bot framework made to be simple',
	favicon: "favicon.ico",

	// Set the production url of your site here
	url: 'https://your-docusaurus-site.example.com',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'PAdventures', // Usually your GitHub org/user name.
	projectName: 'Vortexus.js', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

    markdown: {
        format: 'detect'
    },
    
    scripts: [
        {
            src: '/discord-components.config.js',
            async: false
        }
    ],

    plugins: [
        [
            "docusaurus-plugin-typedoc",
            {
                ...baseTypedocOptions,
                id: 'core',
                entryPoints: ["../packages/core/src/index.ts"],
                tsconfig: '../packages/core/tsconfig.json',
                readme: '../packages/core/README.md',
                out: './docs/Documentation/api-core',
                plugin: ['typedoc-plugin-mdn-links', 'typedoc-plugin-djs-links']
            }
        ],
        [
            "docusaurus-plugin-typedoc",
            {
                ...baseTypedocOptions,
                id: 'utility',
                entryPoints: ["../packages/utility/src/index.ts"],
                tsconfig: '../packages/utility/tsconfig.json',
                readme: '../packages/utility/README.md',
                out: './docs/Documentation/api-utility',
                plugin: ['typedoc-plugin-mdn-links', 'typedoc-plugin-djs-links']
            }
        ],
        [
            "docusaurus-plugin-typedoc",
            {
                ...baseTypedocOptions,
                id: 'vortexus.js',
                entryPoints: ["../packages/vortexus.js/src/index.ts"],
                tsconfig: '../packages/vortexus.js/tsconfig.json',
                readme: '../packages/vortexus.js/README.md',
                out: './docs/Documentation/api-vortexus.js',
                plugin: ['typedoc-plugin-mdn-links', 'typedoc-plugin-djs-links']
            }
        ],
    ],

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.ts'),
                    remarkPlugins: [convertNpmToPackageManagers, ts2esm2cjs],
                    showLastUpdateTime: true,
                    showLastUpdateAuthor: true,
					editUrl: 'https://github.com/PAdventures/Vortexus.js/edit/website/website',
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
        tableOfContents: {
            minHeadingLevel: 2,
            maxHeadingLevel: 4
        },
        announcementBar: {
            content: "⚠️ Vortexus.js is currently being developed. Everything on this website is subject to be changed frequently ⚠️",
            isCloseable: false,
            backgroundColor: "#ff0000",
            textColor: "#fff"
        },
        colorMode: {
            defaultMode: 'dark',
            respectPrefersColorScheme: true
        },
		navbar: {
			title: 'Vortexus.js',
			logo: {
				alt: 'Vortexus.js Logo',
				src: 'img/logo.svg',
			},
			items: [
				{
					to: '/docs/General/Welcome',
                    position: 'left',
                    label: 'Documentation',
				},
                {
                    to: '/docs/Guide/Home/Introduction',
                    position: 'left',
                    label: 'Guide'
                },
				{
					href: 'https://github.com/PAdventures/Vortexus.js',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Guide',
							to: '/docs/Guide/Home/Introduction',
						},
                        {
                            label: 'vortexus.js',
                            to: '/docs/Documentation/api-vortexus.js'
                        },
                        {
                            label: '@vortexus.js/core',
                            to: '/docs/Documentation/api-core'
                        },
                        {
                            label: '@vortexus.js/utility',
                            to: '/docs/Documentation/api-utility',
                            
                        },
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'Discord',
							href: 'https://discord.gg/Ek4PrXGWUq',
						},
					],
				},
				{
					title: 'More',
					items: [
						{
							label: 'GitHub',
							href: 'https://github.com/PAdventures/Vortexus.js',
						},
					],
				},
			],
            copyright: `Copyright © ${new Date().getFullYear()} Vortexus.js, PAdventures`
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.oneDark,
            magicComments: [
                {
                    className: 'theme-code-block-highlighted-line',
                    line: 'highlight-next-line',
                    block: {start: 'highlight-start', end: 'highlight-end'},
                },
                {
                    className: 'code-block-error-line',
                    line: 'error-line'
                }
            ]
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
