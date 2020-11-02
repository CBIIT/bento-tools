import React from 'react';
import injectSheet from 'react-jss';

const StatsBar = ({
  classes, data, globalStatsData, statsStyling,
}) => (
  <>
    <div className={classes.statsSection}>
      <div
        className={classes.box}
      >
        {globalStatsData.slice(0, 6).map((stat) => (
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
              <div className={classes.statTitle}>
                {stat.statTitle}
              </div>
              <div className={classes.statCount}>
                {data[stat.statAPI]}
              </div>
            </div>
          )
            : (
              <div>
                <div className={classes.statCount}>
                  {data[stat.statAPI]}
                </div>
                <div className={classes.statTitle}>
                  {stat.statTitle}
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

const styles = (statsStyling) => ({
  statsSection: {
    top: '139px',
    width: '100%',
    zIndex: 999,
    position: 'fixed',
    background: statsStyling.global.background ? statsStyling.global.background : '#8DCAFF',
    textAlign: 'center',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  box: {
    display: 'inline-flex',
    height: statsStyling.global.height ? statsStyling.global.height : '47px',
    margin: '0 auto',
  },
  statTitle: {
    float: 'left',
    color: '#062D4F',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '11px',
    letterSpacing: '1px',
    margin: '14px 8px 0px 0px',
    textTransform: 'uppercase',
  },
  statCount: statsStyling.global.horizontalStyle === true ? {
    display: 'inline-block',
    float: 'left',
    color: '#0467BD',
    fontFamily: 'Oswald',
    fontSize: '20px',
    margin: '6px 0px 0px 0px',
    fontWeight: 600,
  } : {
    color: '#0467BD',
    fontFamily: 'Oswald',
    fontSize: '20px',
    margin: '6px 0px 0px 0px',
    fontWeight: 600,
  },
  statsGroup: {
    // spacing between stats
    margin: '4px 32px',
  },
  statsIcon: {
    position: 'absolute',
    float: 'left',
    width: '28px',
    height: '28px',
    margin: '8px 0px 0px -35px',
  },
});

StatsBar.defaultProps = {
  classes: {},
};

const StyledStatsBar = injectSheet(styles)(StatsBar);
export default StyledStatsBar;
