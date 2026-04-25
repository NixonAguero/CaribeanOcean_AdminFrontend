import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import type { RoomStatus } from "../types/roomStatus.types";

interface Props {
  rooms: RoomStatus[];
}

const now = new Date();
const formattedDate = now.toLocaleDateString();
const formattedTime = now.toLocaleTimeString();

const RoomStatusPDF = ({ rooms }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <Image
          src="https://res.cloudinary.com/dm9dniopv/image/upload/v1776803372/logo.png"
          style={styles.logo}
        />
        <View>
          <Text style={styles.hotelName}>Caribbean Ocean Hotel</Text>
          <Text style={styles.subtitle}>Room Status Report</Text>
          <Text style={styles.datetime}>
            Generated on {formattedDate} at {formattedTime}
          </Text>
        </View>
      </View>

      {/* ===== TABLE HEADER ===== */}
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.roomCol]}>Room</Text>
        <Text style={[styles.cell, styles.typeCol]}>Type</Text>
        <Text style={[styles.cell, styles.statusCol]}>Status</Text>
      </View>

      {/* ===== TABLE ROWS ===== */}
      {rooms.map((room) => (
        <View key={room.id} style={styles.tableRow}>
          <Text style={[styles.cell, styles.roomCol]}>
            {room.number}
          </Text>
          <Text style={[styles.cell, styles.typeCol]}>
            {room.roomType}
          </Text>
          <Text
            style={[
              styles.cell,
              styles.statusCol,
              room.status === "AVAILABLE"
                ? styles.available
                : room.status === "OCCUPIED"
                ? styles.occupied
                : styles.inactive
            ]}
          >
            {room.status}
          </Text>
        </View>
      ))}

      {/* ===== FOOTER ===== */}
      <View style={styles.footer}>
        <Text>© Caribbean Ocean Hotel</Text>
        <Text>Internal use only</Text>
      </View>
    </Page>
  </Document>
);

export default RoomStatusPDF;

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff"
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    borderBottom: "1 solid #ccc",
    paddingBottom: 12
  },

  logo: {
    width: 60,
    height: 60,
    marginRight: 16
  },

  hotelName: {
    fontSize: 18,
    fontWeight: "bold"
  },

  subtitle: {
    fontSize: 13,
    marginTop: 2
  },

  datetime: {
    fontSize: 10,
    marginTop: 4,
    color: "#555"
  },

  /* TABLE */
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottom: "1 solid #ccc",
    paddingVertical: 6
  },

  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #eee",
    paddingVertical: 6
  },

  cell: {
    paddingHorizontal: 6
  },

  roomCol: {
    width: "25%"
  },

  typeCol: {
    width: "45%"
  },

  statusCol: {
    width: "30%",
    fontWeight: "bold"
  },

  /* STATUS COLORS */
  available: {
    color: "#2e7d32"
  },

  occupied: {
    color: "#c62828"
  },

  inactive: {
    color: "#6d6d6d"
  },

  /* FOOTER */
  footer: {
    marginTop: 32,
    borderTop: "1 solid #ccc",
    paddingTop: 8,
    fontSize: 9,
    color: "#666",
    textAlign: "center"
  }
});