import React from 'react';
import injectSheet from 'react-jss';
import cn from '../helpers/classNameConcat';
import nciLogo from '../assets/footer/NCI-footer.logo.svg';

const styles = {
  ext: {
    color: 'white',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  extraPadding: {
    marginTop: '10px',
    '@media (max-width: 600px)': {
      marginTop: '0px',
    },
  },
  footerText: {
    color: 'white',
    marginLeft: 16,
    marginRight: 16,
    fontWeight: 400,
    fontSize: '14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    lineHeight: '1.71',
    whiteSpace: 'nowrap',
    '@media (max-width: 600px)': {
      fontSize: 12,
    },
  },
  nciLinks: {
    display: 'flex',
    fontSize: '14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      marginLeft: '20px',
    },
  },
  listHeader: {
    paddingBottom: '4px',
    fontWeight: 600,
    fontSize: '14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
  },
  footerComponent: {
    lineHeight: '1.42857143',
    margin: '0',
    '-webkit-font-smoothing': 'antialiased',
    background: '#325068',
    color: 'white',
    padding: '24px 35px 64px 35px',
    '& ul': {
      listStyle: 'none',
      margin: '0',
      padding: '0',
    },

    '& li': {
      lineHeight: '2.17',
    },

    /* Style a button like a link for accessibility */
    '& button': {
      background: 'none!important',
      color: 'inherit',
      border: 'none',
      padding: '0!important',
      font: 'inherit',
      cursor: 'pointer',
    },

    '& a, & button': {
      color: 'white',
      textDecoration: 'none',

      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  footerRow: {
    display: 'flex',
    flexDirection: 'column',
    // width: '1200px',
    margin: '0 auto',

    '@media (min-width: 900px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  footerRowSection: {
    marginTop: '16px',
    '@media (max-width: 900px)': {
      margin: '16px',
    },
  },
  turningNIH: {
    fontSize: '14px',
    color: 'white',
    textDecoration: 'none',
  },
  footorVersiontext: {
    fontSize: '8px',
    color: 'white',
    textDecoration: 'none',
  },
  footerNciColumn: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '30px',
    '@media (min-width: 600px)': {
      width: '200px',
    },

    '@media (min-width: 960px)': {
      width: '300px',
    },

    '& .nciBadge': {
      border: '0',
      height: '40px',
    },
  },

  footerBar: {
    color: 'white',
    backgroundColor: '#4F536B',
    width: '100%',
    textAlign: 'center',
    '-webkit-font-smoothing': 'antialiased',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '14px',
    marginTop: '48px',
  },
  contentJustifyCenter: {
    justifyContent: 'center',
  },
  contentJustifyLeft: {
    justifyContent: 'left',
  },
  horizontalLine: {
    width: '100%',
    margin: '32px auto 16px auto',
    borderTop: '1px solid #1E394D',
  },
  marginRight40: {
    marginRight: '40px',
  },
  nciLogo: {
    '@media (min-width: 960px)': {
      width: 'calc((100vw)/4)',
    },
  },
};

const Footer = ({ classes, data }) => (
  <footer className={classes.footerComponent}>
    <div className={classes.footerRow}>
      <div className={
            cn(classes.footerRowSection, classes.footerNciColumn, classes.marginRight40)
  }
      >
        <img
          src={nciLogo}
          alt="nciLogo"
          className={classes.nciLogo}
        />
      </div>
      { data.link_sections.map((linkSection) => (
        <div className={classes.footerRowSection}>
          <ul>
            <li>
              <div
                className={cn(classes.footerText, classes.listHeader)}
              >
                { linkSection.title }
              </div>
            </li>
            {linkSection.items.map((footerRowSectionItem) => (
              <li>
                <div className={classes.footerText}>
                  {footerRowSectionItem.text}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div>
      <div className={classes.horizontalLine} />
    </div>
    <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
      <div className={cn(classes.nciLinks, classes.contentJustifyCenter)}>
        {data.nci_links.map((nciLink) => (
          <div>
            <a target="icdc-external" href={nciLink.href}>
              {nciLink.text}
            </a>
            <span className={classes.ext}>&nbsp;|&nbsp;</span>
          </div>
        ))}
      </div>
    </div>
    <div className={cn(classes.footerRow, classes.contentJustifyCenter)}>
      <div
        className={cn(
          classes.extraPadding,
          classes.nciLinks,
          classes.contentJustifyCenter,
        )}
      >
        <div>
          <span className={classes.turningNIH}>
            NIH … Turning Discovery Into Health
            <sup>®</sup>
          </span>
        </div>
      </div>
    </div>
    {/* Quick and dirty for adding version number in footer */}
    <div className={cn(classes.footerRow, classes.contentJustifyLeft)}>
      <div
        className={cn(
          classes.extraPadding,
          classes.nciLinks,
          classes.contentJustifyCenter,
        )}
      >
        <div>
          <span className={classes.footorVersiontext}>
            Version:&nbsp;
            {data.version}
          </span>
        </div>
      </div>
    </div>
    {/* End of Quick and dirty for adding version number in footer */}
  </footer>
);

Footer.defaultProps = {
  classes: {},
};

const StyledFooter = injectSheet(styles)(Footer);
export default StyledFooter;
