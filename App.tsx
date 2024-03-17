import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation';
import {RealmProvider} from '@realm/react';
import {Owner, Post} from './src/models';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar />
        <RealmProvider schemaVersion={5} schema={[Post, Owner]}>
          <Navigation />
        </RealmProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
