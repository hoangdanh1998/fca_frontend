import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
// import styles from './index.less';
import { ResponsivePie } from '@nivo/pie';
import { PIE_CHART_DATA_PARTNER } from '../../../../../config/seedingData';

class PieChart extends React.Component {
  state = {};

  render() {
    const data = this.props.data;
    const legends = this.props.legends;
    // const data = PIE_CHART_DATA_PARTNER;
    return (
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        // colors={{ scheme: 'pastel2' }}
        colors={{ datum: 'data.color' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        legends={[
          {
            anchor: legends.anchor,
            direction: legends.direction,
            justify: false,
            translateX: 0,
            translateY: 70,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    );
  }
}

export default PieChart;
