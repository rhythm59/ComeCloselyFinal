import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import ProgressBar from './ProgressBar';
import {StoryI} from '../types';

interface ComponentProp {
  pause: boolean;
  duration: number;
  currentIndex: number;
  isNewStory: boolean;
  isLoaded: boolean;
  stories: Array<StoryI>;
  currentStory: StoryI;
  length: any;
  next: any;
  progress: any;
}

const ProgressArray = (props: ComponentProp) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (props.pause) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        //timing: 300,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
        //timing: 300,
      }).start();
    }
  }, [opacity, props.pause]);

  return (
    <Animated.View style={[styles.progressBarArray, {opacity}]}>
      {props.length.map((i: any, index: number) => (
        <ProgressBar
          index={index}
          duration={props.duration || 3}
          isNewStory={props.isNewStory}
          currentIndex={props.currentIndex}
          next={props.next}
          /* length={props.stories.length} */
          active={i === props.currentIndex ? 1 : i < props.currentIndex ? 2 : 0}
          isLoaded={props.isLoaded}
          pause={props.pause}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  progressBarArray: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '98%',
    height: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ProgressArray;
