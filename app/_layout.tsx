// App.tsx
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="loginClient"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="loginWorker"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(app)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default App;
