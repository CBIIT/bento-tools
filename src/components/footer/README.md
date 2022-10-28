# Footer Bento

ICDC frontend - Footer component (New Design)
<img width="1429" alt="Screen Shot 2022-10-28 at 12 22 06 PM" src="https://user-images.githubusercontent.com/8271695/198687445-8a5694cb-90db-4550-abe7-7b8282fe7f18.png">

Bento Footer Component (Old Design)
<img width="1737" alt="Screen Shot 2022-10-28 at 12 35 02 PM" src="https://user-images.githubusercontent.com/8271695/198687767-1545f1fc-a960-4e46-b6ca-5254d79a7874.png">

## Global footer Configuration.

```bash
{
	"footerLogoImage": "https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/footer/FNL_logo.png",
	"footerLogoAltText": "https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/footer/FNL_logo.png",
	"footerLogoHyperlink": "https://frederick.cancer.gov/",
	"footerStaticText": "NIH … Turning Discovery Into Health®",
	"maxSubsections": 3,
	"maxSubsectionsLinks": 4,
	"maxAnchorLinks": 4,
	"version": "1.0,0",
	"BEversion": "1.0.0",
	"FileServiceVersion": "1.2.0",
	"link_sections": [
		{
			"title": "About Bento",
			"items": [
				{
					"text": "Purpose",
					"link": "/purpose"
				},
				{
					"text": "Resources",
					"link": "/resources"
				},
				{
					"text": "Documentation",
					"link": "/documentation"
				}
			]
		},
		{
      "title": "Support",
			"items": [
				{
					"text": "Contact Us",
					"link": "bento-help@nih.gov"
				},
				{
					"link": "https://www.linkedin.com/",
					"icon": "https://raw.githubusercontent.com/CBIIT/bento-tools/master/src/components/assets/footer/linkedInIcon.svg"
				}
			]
		}
  ],
  "global_footer_links": [
    {
      "text": "U.S. Department of Health and Human Services",
      "link": "https://www.hhs.gov"
    },
    {
      "text": "National Institutes of Health",
      "link": "https://www.nih.gov"
    },
    {
      "text": "National Cancer Institute",
      "link": "https://www.cancer.gov"
    },
    {
      "text": "USA.gov",
      "link": "https://www.usa.gov"
	}
  ]}
```

## Updating style for horizontal line.
Use Themeprovider to update or remove horizontal line (MuiDivider) to implement new design

```bash
const themesLight = _.cloneDeep(themes.light);
  themesLight.overrides.MuiDivider = {
    root: {
      height: '0px',
    },
  };

  const computedTheme = createTheme({
    ...themesLight,
    ...overrides,
  });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
```

```bash
  <CustomThemeProvider>
    <Footer data={footerUpdatedData} />
  </CustomThemeProvider>
```
