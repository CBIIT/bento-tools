import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, ResponsiveContainer,
} from 'recharts';

let COLORS_EVEN = [
  '#D4D4D4',
  '#057EBD',
  '#0C3151',
  '#F78F49',
  '#79287C',
  '#7CC242',
  '#61479D',
];

let COLORS_ODD = [
  '#057EBD',
  '#0C3151',
  '#F78F49',
  '#79287C',
  '#7CC242',
  '#61479D',
  '#D4D4D4',
];

const renderActiveShape = (props) => {
  // const RADIAN = Math.PI / 180;
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value, textColor, fontSize,
  } = props;
  // const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + 2) * cos;
  // const sy = cy + (outerRadius + 2) * sin;
  // const mx = cx + (outerRadius + 5) * cos;
  // const my = cy + (outerRadius + 5) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 20;
  // const ey = my;
  // const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy * 2} dy={0} textAnchor="middle" fill={textColor} fontSize={fontSize || '12px'} fontWeight="500" fontFamily="Nunito">{String(payload.name).length > 30 ? `${String(payload.name).substr(0, 30)}...` : payload.name}</text>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={textColor} fontSize="12px" fontWeight="bold" fontFamily="Nunito">{`${value}`}</text>
      <text x={cx} y={cy} dy={12} textAnchor="middle" fill={textColor} fontSize="12px" fontWeight="light" fontFamily="Nunito">Cases</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 8}
        fill={fill}
      />

    </g>
  );
};

export default class CustomActiveDonut extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const {
      data: DataObj, textColor, colors,
    } = this.props;
    const data = DataObj.map((obj) => ({
      name: obj.group,
      value: obj.subjects,
    }));

    if (colors) {
      COLORS_EVEN = colors.even;
      COLORS_ODD = colors.odd;
    }

    const { activeIndex } = this.state;

    return (
      <ResponsiveContainer width={185} height={210}>
        <PieChart textColor={textColor}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={90}
            cy={98}
            textColor={textColor}
            innerRadius={45}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={this.onPieEnter}
            blendStroke
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={data.length % 2 === 0 ? COLORS_EVEN[index % COLORS_EVEN.length] : COLORS_ODD[index % COLORS_ODD.length]} textColor={textColor} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
