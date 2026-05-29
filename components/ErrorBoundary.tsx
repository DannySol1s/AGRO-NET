import React from 'react';
import { View, Text, Pressable } from 'react-native';

type Props = { children: React.ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <View className="flex-1 bg-white items-center justify-center px-8">
          <Text className="text-4xl mb-4">⚠️</Text>
          <Text className="text-gray-900 text-lg font-bold text-center mb-2">
            Algo salió mal
          </Text>
          <Text className="text-gray-500 text-sm text-center mb-6 leading-5">
            {this.state.error.message}
          </Text>
          <Pressable
            onPress={this.reset}
            className="bg-verde-700 rounded-2xl px-8 py-4 active:opacity-80"
          >
            <Text className="text-white font-bold">Reintentar</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}
