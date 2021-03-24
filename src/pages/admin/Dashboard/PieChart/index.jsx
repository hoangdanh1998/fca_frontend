import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
// import styles from './index.less';
import { ResponsivePie } from '@nivo/pie';
import { PIE_CHART_DATA } from '../../../../../config/seedingData';

class PieChart extends React.Component {
  state = {};

  render() {
    //   const data = this.props.data;
    const data = PIE_CHART_DATA;
    return (
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'pastel2' }}
        // color={['#6ec215', '#c2bebe', '#f5ad42', '#696666']}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        // fill={[
        //   {
        //     match: {
        //       id: 'ruby',
        //     },
        //     id: 'dots',
        //   },
        //   {
        //     match: {
        //       id: 'c',
        //     },
        //     id: 'dots',
        //   },
        //   {
        //     match: {
        //       id: 'go',
        //     },
        //     id: 'dots',
        //   },
        //   {
        //     match: {
        //       id: 'python',
        //     },
        //     id: 'dots',
        //   },
        //   {
        //     match: {
        //       id: 'scala',
        //     },
        //     id: 'lines',
        //   },
        //   {
        //     match: {
        //       id: 'lisp',
        //     },
        //     id: 'lines',
        //   },
        //   {
        //     match: {
        //       id: 'elixir',
        //     },
        //     id: 'lines',
        //   },
        //   {
        //     match: {
        //       id: 'javascript',
        //     },
        //     id: 'lines',
        //   },
        // ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
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
