import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
// import styles from './index.less';
import { ResponsiveLine } from '@nivo/line';
import { LINE_CHART_DATA } from '../../../../../config/seedingData';

class LineChart extends React.Component {
  state = {};

  render() {
    const data = this.props.data;
    // const data = LINE_CHART_DATA;
    return (
      <ResponsiveLine
        data={data}
        onClick={this.props.onClick}
        // margin={{ top: 20, right: 20, bottom: 20, left: 30 }}
        margin={{ top: 20, right: 110, bottom: 20, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'date',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'order',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        color={{ scheme: 'pastel2' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        // legends={[
        //   {
        //     anchor: 'bottom-right',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 100,
        //     translateY: 0,
        //     itemsSpacing: 0,
        //     itemDirection: 'left-to-right',
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: 'circle',
        //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemBackground: 'rgba(0, 0, 0, .03)',
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    );
  }
}

export default LineChart;
