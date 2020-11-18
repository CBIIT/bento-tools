import React, { PureComponent } from 'react';
import { Sunburst, LabelSeries } from 'react-vis';
import injectSheet from 'react-jss';

function getKeyPath(node) {
  if (!node.parent) {
    return ['root'];
  }

  return [(node.data && node.data.title) || node.title].concat(
    getKeyPath(node.parent),
  );
}

function updateData(d, keyPath) {
  const data = d;
  if (data.children) {
    data.children.map((child) => updateData(child, keyPath));
    data.style = {
      ...data.style,
      fillOpacity: keyPath && !keyPath[data.title] ? 0.2 : 0.7,
    };
  } else {
    data.style = {
      ...data.style,
      fillOpacity: keyPath && !keyPath[data.title] ? 0.2 : 1,
    };
  }
  return data;
}

// find the caseSize of a given title
function findCaseSizeOfTitle(data, title) {
  if (title === '') {
    return data.caseSize;
  }
  if (data.title !== title) {
    if (data.children) {
      let match = 0;
      data.children.forEach((d) => {
        const res = findCaseSizeOfTitle(d, title);
        if (res !== 0) {
          match = res;
        }
      });
      return match;
    }
    return 0;
  }
  return data.caseSize;
}

const styles = {
  title: {
    color: (props) => (props.textColor ? props.textColor : 'black'),
    fontSize: '12px',
    maxWidth: '1440px',
    fontFamily: 'Nunito',
    lineHeight: '20px',
    fontWeight: '500',
    height: '20px',
    textAlign: (props) => (props.titleAlignment ? props.titleAlignment : 'center'),
  },
  customWidget: {
    marginTop: '18px',
  },
};

class ProgramSunburst extends PureComponent {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      widgetData: data,
      size: findCaseSizeOfTitle(data, ''),
      title: '',
      caseSize: data.children[0].caseSize,
    };
  }

  render() {
    const {
      caseSize, size, widgetData, title,
    } = this.state;
    const {
      width, height, data, textColor, classes, titleLocation,
    } = this.props;
    // update the caseSize  associated with title

    this.setState({
      widgetData: data,
      size,
      title,
      caseSize: findCaseSizeOfTitle(data, title),
    });

    return (
      <>
        <div className={classes.customWidget}>
          {titleLocation === 'top' && (
          <div className={classes.title}>
            {title}
          </div>
          )}
          <Sunburst
            id={widgetData.key}
            hideRootNode
            animation
            colorType="literal"
            data={widgetData}
            height={height}
            width={width}
            style={{
              stroke: '#ddd',
              strokeOpacity: 0.3,
              strokeWidth: '0.5',
            }}
            onValueMouseOver={(node) => {
              const path = getKeyPath(node).reverse();
              const pathAsMap = path.reduce((res, row) => {
                res[row.toString()] = true;
                return res;
              }, {});
              const wdata = updateData(widgetData, pathAsMap);
              this.setState({
                size: node.size,
                widgetData: wdata,
                title: node.title,
                caseSize: node.size || node.caseSize,
              });
            }}
          >
            {caseSize > 0 && (
            <LabelSeries data={[{
              x: 0,
              y: 0,
              label: caseSize,
              style: {
                fontSize: '12px',
                textAnchor: 'middle',
                fill: textColor,
                fontFamily: '"Nunito","Open Sans", sans-serif',
              },
            }, {
              x: 0,
              y: 1,
              label: 'Cases',
              style: {
                fontSize: '12px',
                textAnchor: 'middle',
                fill: textColor,
                fontFamily: '"Nunito","Open Sans", sans-serif',
              },
            }]}
            />
            )}
          </Sunburst>
          {titleLocation === 'bottom' && (
          <div className={classes.title}>
            {title}
          </div>
          )}
        </div>
      </>
    );
  }
}

const Chart = injectSheet(styles)(ProgramSunburst);

export default Chart;
