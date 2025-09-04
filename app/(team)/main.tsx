import memberApi from "@/api/memberApi";
import teamApi from "@/api/teamApi";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import ToggleTabButton from "@/components/ToogleTabButton";
import BottomNavBar from "@/components/navigation/ButtonNavBar";
import CreateTeamPopup from "@/components/popup/CreateTeam";
import JoinPopup from "@/components/popup/JoinTeam";
import TeamItem from "@/components/team/TeamItem";
import { useTeamContext } from "@/context/teamContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
interface Team {
  id: string;
  name: string;
  isAdmin: boolean;
  imageSource: string;
}

export default function TeamScreen() {
  const [activeTab, setActiveTab] = useState("team");
  const [activeFilter, setActiveFilter] = useState<"joined" | "managed">(
    "joined"
  );

  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);

  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);

  const router = useRouter();
  const [teams, setTeams] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string>("");
  const [size, setSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = "554c0f1d-b1f4-4466-8778-8caaff792b45";
  const { setId } = useTeamContext();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);

        const response = await teamApi.getAll(userId, cursor, size);

        const data: Team[] = Array.isArray(response.teams)
          ? response.teams.map((item: any) => ({
              id: item.id,
              name: item.name,
              isAdmin: item.managedByUser,
              imageSource: item.avatarUrl,
            }))
          : [];
        setTeams(data);
        console.log(response.teams);
        setFilteredTeams(data);
      } catch (error) {
        console.error("Error fetching teams", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [cursor, size]);

  const getVisibleTeams = () => {
    if (activeFilter === "joined") return filteredTeams;
    return filteredTeams.filter((team) => team.isAdmin);
  };
  const handleJoinTeam = async (teamCode: string) => {
    try {
      const response = await memberApi.join(userId, teamCode);
      if (response) {
        Alert.alert("Success", "You have successfully joined the team!");
      } else {
        Alert.alert("Error", "Failed to join the team. Please try again.");
      }
    } catch (error: any) {
      console.error("Error joining team:", error);

      const errorMessage =
        error.response?.message || "There was an error joining the team.";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleSaveNewTeam = async (name: string, description: string) => {
    try {
      const response = await teamApi.create(userId, name, description);
      console.log("Team created successfully:", response);
      const newTeam = response;
      setFilteredTeams([newTeam, ...filteredTeams]);
    } catch (error) {
      console.error("Error creating team:", error);
      Alert.alert("Error", "There was an error creating the team.");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header showMenu={false} />
      {/* Search Bar */}
      <View style={styles.search}>
        <SearchBar
          data={teams}
          searchKey="name"
          onFiltered={setFilteredTeams}
          placeholder="Search for teams..."
        />
      </View>

      {/* Filter Tabs + join button */}
      <View style={styles.tagsContainer}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#1E282D",
            borderRadius: 5,
            padding: 5,
          }}
        >
          <ToggleTabButton
            title="JOINED"
            active={activeFilter === "joined"}
            onPress={() => setActiveFilter("joined")}
          />
          <ToggleTabButton
            title="MANAGED"
            active={activeFilter === "managed"}
            onPress={() => setActiveFilter("managed")}
          />
        </View>

        <View>
          <CustomButton
            fontSize={16}
            icon={<Ionicons name="add-circle-sharp" size={22} color="#fff" />}
            onPress={() => setShowJoinPopup(true)}
            bgColor="#7AB2D3"
            textColor="#fff"
          >
            Join a team
          </CustomButton>
        </View>
      </View>

      <View style={styles.teamList}>
        <FlatList
          data={getVisibleTeams()}
          keyExtractor={(team) => team.id.toString()}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: team }) => (
            <TeamItem
              title={team.name}
              imageSource={team.imageSource}
              isAdmin={team.isAdmin}
              onPress={() => {
                setId(team.id); // Cập nhật teamId trong context
                router.push(`/Team/${team.id}?userId=${userId}`);
              }}
            />
          )}
        />
      </View>
      {/* Popup join team */}
      <JoinPopup
        visible={showJoinPopup}
        onClose={() => setShowJoinPopup(false)}
        onSave={handleJoinTeam}
      />
      {/* Popup tạo team */}
      <CreateTeamPopup
        visible={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onSave={handleSaveNewTeam}
      />

      {/* Nav Bar */}
      <BottomNavBar onAddPress={() => setShowCreatePopup(true)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    gap: 20,
  },
  search: {
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  tagsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  teamList: {
    flex: 1,
    width: "100%",
  },
  smallScreen: {
    fontSize: width < 360 ? 14 : 16,
  },
  smallPadding: {
    paddingHorizontal: width < 360 ? 8 : 15,
  },
});
