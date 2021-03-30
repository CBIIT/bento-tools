import React from 'react';
// import injectSheet from 'react-jss';
import { withStyles } from '@material-ui/core';

const StatsBar = ({
  classes, data, globalStatsData, statsStyling,
}) => (
  <>
    <div className={classes.statsSection}>
      <div
        className={classes.box}
      >
        {globalStatsData.slice(0, 6).map((stat, index) => (
          <div className={classes.statsGroup}>
            <div className={classes.statsIcon}>
              <img
                src={stat.statIconSrc}
                alt={stat.statIconAlt}
              />
            </div>
            {
          statsStyling.global.statTitleFirst === true ? (
            <div>
              <div className={classes.statTitle} id={`statsbar_title_${index + 1}`}>
                {stat.statTitle}
              </div>
              <div className={classes.statCount} id={`statsbar_count_${index + 1}`}>
                {data[stat.statAPI]}
              </div>
            </div>
          )
            : (
              <div>
                <div className={classes.statCount} id={`statsbar_count_${index + 1}`}>
                  {data[stat.statAPI]}
                </div>
                <div className={classes.statTitle} id={`statsbar_title_${index + 1}`}>
                  {stat.statTitle ? stat.statTitle : 0}
                </div>
              </div>
            )
            }
          </div>
        ))}
      </div>
    </div>
  </>
);

const styles = () => ({
  statsSection: (props) => ({
    top: props.statsStyling.global.top ? props.statsStyling.global.top : '139px',
    width: '100%',
    zIndex: 999,
    position: 'fixed',
    background: props.statsStyling.global.background ? props.statsStyling.global.background : '#8DCAFF',
    textAlign: 'center',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  box: (props) => ({
    display: 'inline-flex',
    height: props.statsStyling.global.height ? props.statsStyling.global.height : '47px',
    margin: '0 auto',
  }),
  statTitle: (props) => ({
    float: props.statsStyling.statTitle ? props.statsStyling.statTitle.float ? props.statsStyling.statTitle.float : 'left' : 'left',
    color: props.statsStyling.statTitle ? props.statsStyling.statTitle.color ? props.statsStyling.statTitle.color : '#062D4F' : '#062D4F',
    fontFamily: props.statsStyling.statTitle ? props.statsStyling.statTitle.fontFamily ? props.statsStyling.statTitle.fontFamily : 'Nunito' : 'Nunito',
    fontWeight: 600,
    fontSize: props.statsStyling.statTitle ? props.statsStyling.statTitle.fontSize ? props.statsStyling.statTitle.fontSize : '11px' : '11px',
    letterSpacing: '1px',
    margin: props.statsStyling.global.statTitleFirst === true ? '14px 8px 0px 0px' : '6px 0px 0px 15px',
    textTransform: props.statsStyling.statTitle ? props.statsStyling.statTitle.textTransform ? props.statsStyling.statTitle.textTransform : 'uppercase' : 'uppercase',
  }),
  statCount: (props) => (props.statsStyling.global.horizontalStyle === true ? {
    display: 'inline-block',
    float: props.statsStyling.statCount ? props.statsStyling.statCount.float ? props.statsStyling.statCount.float : 'left' : 'left',
    color: props.statsStyling.statCount ? props.statsStyling.statCount.color ? props.statsStyling.statCount.color : '#0467BD' : '#0467BD',
    fontFamily: props.statsStyling.statCount ? props.statsStyling.statCount.fontFamily ? props.statsStyling.statCount.fontFamily : 'Oswald' : 'Oswald',
    fontSize: props.statsStyling.statCount ? props.statsStyling.statCount.fontSize ? props.statsStyling.statCount.fontSize : '20px' : '20px',
    margin: props.statsStyling.statCount ? props.statsStyling.statCount.margin ? props.statsStyling.statCount.margin : '6px 0px 0px 0px' : '6px 0px 0px 0px',
    fontWeight: 600,
  } : {
    color: props.statsStyling.statCount ? props.statsStyling.statCount.color ? props.statsStyling.statCount.color : '#0467BD' : '#0467BD',
    fontFamily: props.statsStyling.statCount ? props.statsStyling.statCount.fontFamily ? props.statsStyling.statCount.fontFamily : 'Oswald' : 'Oswald',
    fontSize: props.statsStyling.statCount ? props.statsStyling.statCount.fontSize ? props.statsStyling.statCount.fontSize : '20px' : '20px',
    margin: props.statsStyling.statCount ? props.statsStyling.statCount.margin ? props.statsStyling.statCount.margin : '6px 0px 0px 0px' : '6px 0px 0px 0px',
    float: props.statsStyling.statCount ? props.statsStyling.statCount.float ? props.statsStyling.statCount.float : 'none' : 'none',
    fontWeight: 600,
  }),
  statsGroup: (props) => ({
    // spacing between stats
    margin: props.statsStyling.statsGroup ? props.statsStyling.statsGroup.margin ? props.statsStyling.statsGroup.margin : '4px 32px' : '4px 32px',
  }),
  statsIcon: (props) => ({
    position: 'absolute',
    float: 'left',
    width: props.statsStyling.statsIcon ? props.statsStyling.statsIcon.width ? props.statsStyling.statsIcon.width : '28px' : '28px',
    height: props.statsStyling.statsIcon ? props.statsStyling.statsIcon.height ? props.statsStyling.statsIcon.height : '28px' : '28px',
    margin: '8px 0px 0px -35px',
  }),
});

StatsBar.defaultProps = {
  classes: {},
  statsStyling: {},
};

// TODO: need to change it to injectStyle sheet
const StyledStatsBar = withStyles(styles)(StatsBar);
export default StyledStatsBar;
