import React from 'react';
import {
  FlatList,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

export class RkGalleryGrid extends React.Component {
  static propTypes = {
    items: PropTypes.node.isRequired,
    spanCount: PropTypes.number,
    onItemClick: PropTypes.func,
    style: ViewPropTypes.style,
    itemStyle: ViewPropTypes.style,
  };
  static defaultProps = {
    spanCount: 3,
    onItemClick: (() => null),
    style: null,
    itemStyle: {
      margin: 2,
    },
  };

  state = {
    itemSize: {
      width: 0,
      height: 0,
    },
  };

  extractItemKey = (item, index) => index.toString();

  onItemViewClick = (item, index) => {
    this.props.onItemClick(item, index);
  };

  renderItemView = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => this.onItemViewClick(item, index)}>
      <Image
        style={[this.state.itemSize, this.props.itemStyle]}
        source={item}
      />
    </TouchableWithoutFeedback>
  );

  onLayout = (event) => {
    const margin = StyleSheet.flatten(this.props.itemStyle).margin || 0;
    this.setState({
      itemSize: {
        width: (event.nativeEvent.layout.width / this.props.spanCount) - (margin * 2),
        height: (event.nativeEvent.layout.width / this.props.spanCount) - (margin * 2),
      },
    });
  };

  render() {
    return (
      <FlatList
        style={[this.props.style, defaultComponentStyles.container]}
        onLayout={this.onLayout}
        data={this.props.items}
        numColumns={this.props.spanCount}
        renderItem={this.renderItemView}
        keyExtractor={this.extractItemKey}
      />
    );
  }
}

const defaultComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
});