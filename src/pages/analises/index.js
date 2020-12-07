//import * as React from 'react';
import { StatusBar, View, StyleSheet,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Donut from '../../../Donut'
import React, { Component } from 'react';
import Dashboard from 'react-native-dashboard';
import {FlatList, Alert, Image, Modal, TouchableOpacity} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { render } from 'react-dom';
import { BarChart, Grid, PieChart, StackedBarChart  } from 'react-native-svg-charts'
import { Text  } from 'react-native-svg'

const items = [
  { name: 'Motoristas', background: '#3498db', icon: 'group' },
  { name: 'Veículos', background: '#02ef1d', icon: 'car' },
  { name: 'Vendas', background: '#ef5802', icon: 'money' },
];
 

const data1 = [{
  percentage: 8,
  color: 'tomato',
  max: 10
}, {
  percentage: 14,
  color: 'skyblue',
  max: 20
}, {
  percentage: 92,
  color: 'gold',
  max: 100
}, {
  percentage: 240,
  color: '#222',
  max: 500
}]

const fill = 'rgb(134, 65, 244)'
const data2 = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]

const data3 = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)


export default class Analises extends Component {
  _card = el => {
    console.log('Card: ' + el.name)
  };

  
  render(){

    const data = [30, 10, 25, 18];
    
    const pieData = data.map((value, index) => ({
      value,
      key: `${index}-${value}`,
      svg:{
        fill: randomColor()
      }
    }));
    
    const Label = ({ slices }) =>{
      return slices.map((slice, index) =>{
        const {pieCentroid, data} = slice;
        return(
          <Text
            key={`label-${index}`}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill="black"
            textAnchor={'middle'}
            alignmentBaseLine={'middle'}
            fontSize={22}
          >
            {data.value}
          </Text>
        )
      })
    }
    
    const data4 = [
      {
          month: new Date(2015, 0, 1),
          apples: 3840,
          bananas: 1920,
          cherries: 960,
          dates: 400,
          oranges: 400,
      },
      {
          month: new Date(2015, 1, 1),
          apples: 1600,
          bananas: 1440,
          cherries: 960,
          dates: 400,
      },
      {
          month: new Date(2015, 2, 1),
          apples: 640,
          bananas: 960,
          cherries: 3640,
          dates: 400,
      },
      {
          month: new Date(2015, 3, 1),
          apples: 3320,
          bananas: 480,
          cherries: 640,
          dates: 400,
      },
  ]

  const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6']
  const keys = ['apples', 'bananas', 'cherries', 'dates']

    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
                  <Image source={logoImg} />
              </View>
        <StatusBar hidden/>
        
        
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center'}}>
          {data1.map((p, i) => {
            return <Donut key={i} percentage={p.percentage} color={p.color} delay={200 + 100 * i} max={p.max} />
          })}
        </View>


        <PieChart style={{ height: 250 }} data={pieData}>
        <Label/>
        </PieChart>

        
        <StackedBarChart
                  style={{ height: 200 }}
                  keys={keys}
                  colors={colors}
                  data={data4}
                  showGrid={false}
                  contentInset={{ top: 30, bottom: 30 }}
          />

        <BarChart style={{ height: 200 }} data={data2} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
        </BarChart>


  
        </ScrollView>
      </View>
    )}

}

//<Dashboard items={items} background={true} card={this._card} column={2}  />
