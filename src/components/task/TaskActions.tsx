import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import MenuIcon from '../icons/MenuIcon';
import SearchIcon from '../icons/SearchIcon';
import MoreIcon from '../icons/MoreIcon';
import SortIcon from '../icons/SortIcon';

interface Props {
  setSearchModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSortModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskActions({
  setSearchModalVisible,
  setSortModalVisible,
}: Props) {
  return (
    <View style={styles.actions}>
      <View style={styles.menuIconWrapper}>
        <Pressable style={styles.icon}>
          <MenuIcon />
        </Pressable>
      </View>

      <Pressable
        style={styles.icon}
        onPress={() => setSearchModalVisible(true)}
      >
        <SearchIcon />
      </Pressable>
      <Pressable style={styles.icon} onPress={() => setSortModalVisible(true)}>
        <SortIcon />
      </Pressable>
      <Pressable style={styles.icon}>
        <MoreIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
  menuIconWrapper: {
    flex: 1,
  },

  icon: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
