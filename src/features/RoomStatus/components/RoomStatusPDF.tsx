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
const formattedDate = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const formattedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

const OCEAN_DEEP   = "#071e28";
const TEAL         = "#0e7c6e";
const GOLD         = "#c9b878";
const SAND         = "#f5f0e8";
const LIGHT_SAND   = "#faf7f2";
const CORAL        = "#c0392b";
const GRAY         = "#6b7280";

const RoomStatusPDF = ({ rooms }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* ===== HEADER BAR ===== */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <Image
            src="https://res.cloudinary.com/dm9dniopv/image/upload/v1776803372/logo.png"
            style={styles.logo}
          />
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.hotelName}>Caribbean Ocean Hotel</Text>
          <Text style={styles.reportTitle}>Room Status Report</Text>
          <Text style={styles.datetime}>
            Generated on {formattedDate} at {formattedTime}
          </Text>
        </View>
      </View>

      {/* ===== GOLD DIVIDER ===== */}
      <View style={styles.goldDivider} />

      {/* ===== SUMMARY PILLS ===== */}
      <View style={styles.summaryRow}>
        <View style={[styles.pill, styles.pillTotal]}>
          <Text style={styles.pillNumber}>{rooms.length}</Text>
          <Text style={styles.pillLabel}>Total Rooms</Text>
        </View>
        <View style={[styles.pill, styles.pillAvailable]}>
          <Text style={[styles.pillNumber, { color: TEAL }]}>
            {rooms.filter(r => r.status === "AVAILABLE").length}
          </Text>
          <Text style={[styles.pillLabel, { color: TEAL }]}>Available</Text>
        </View>
        <View style={[styles.pill, styles.pillOccupied]}>
          <Text style={[styles.pillNumber, { color: CORAL }]}>
            {rooms.filter(r => r.status === "OCCUPIED").length}
          </Text>
          <Text style={[styles.pillLabel, { color: CORAL }]}>Occupied</Text>
        </View>
        <View style={[styles.pill, styles.pillInactive]}>
          <Text style={[styles.pillNumber, { color: GRAY }]}>
            {rooms.filter(r => r.status !== "AVAILABLE" && r.status !== "OCCUPIED").length}
          </Text>
          <Text style={[styles.pillLabel, { color: GRAY }]}>Inactive</Text>
        </View>
      </View>

      {/* ===== TABLE HEADER ===== */}
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.roomCol, styles.headerCell]}>Room</Text>
        <Text style={[styles.cell, styles.typeCol, styles.headerCell]}>Type</Text>
        <Text style={[styles.cell, styles.statusCol, styles.headerCell]}>Status</Text>
      </View>

      {/* ===== TABLE ROWS ===== */}
      {rooms.map((room, index) => (
        <View
          key={room.id}
          style={[styles.tableRow, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}
        >
          <Text style={[styles.cell, styles.roomCol, styles.roomNumber]}>
            {room.number}
          </Text>
          <Text style={[styles.cell, styles.typeCol]}>
            {room.roomType}
          </Text>
          <View style={[styles.statusCol, styles.statusCellWrapper]}>
            <View style={[
              styles.statusBadge,
              room.status === "AVAILABLE" ? styles.badgeAvailable :
              room.status === "OCCUPIED"  ? styles.badgeOccupied  :
              styles.badgeInactive
            ]}>
              <Text style={[
                styles.statusText,
                room.status === "AVAILABLE" ? styles.textAvailable :
                room.status === "OCCUPIED"  ? styles.textOccupied  :
                styles.textInactive
              ]}>
                {room.status}
              </Text>
            </View>
          </View>
        </View>
      ))}

      {/* ===== FOOTER ===== */}
      <View style={styles.footer}>
        <View style={styles.goldDivider} />
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>© Caribbean Ocean Hotel — Internal use only</Text>
          <Text style={styles.footerText}>Confidential document · Do not distribute</Text>
        </View>
      </View>

    </Page>
  </Document>
);

export default RoomStatusPDF;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff"
  },

  /* HEADER */
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  headerLeft: {
    marginRight: 20,
  },

  headerRight: {
    flex: 1,
  },

  logo: {
    width: 64,
    height: 64,
  },

  hotelName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: OCEAN_DEEP,
    letterSpacing: 0.5,
  },

  reportTitle: {
    fontSize: 13,
    color: TEAL,
    marginTop: 3,
    fontFamily: "Helvetica",
  },

  datetime: {
    fontSize: 9,
    marginTop: 4,
    color: GRAY,
  },

  goldDivider: {
    height: 1.5,
    backgroundColor: GOLD,
    marginBottom: 16,
  },

  /* SUMMARY */
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  pill: {
    flex: 1,
    backgroundColor: LIGHT_SAND,
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
    border: "1 solid #e5e0d5",
  },

  pillTotal: {
    backgroundColor: SAND,
  },

  pillAvailable: {
    backgroundColor: "#e8f5f2",
    border: "1 solid #b2dfdb",
  },

  pillOccupied: {
    backgroundColor: "#fdecea",
    border: "1 solid #f5c6c6",
  },

  pillInactive: {
    backgroundColor: "#f3f4f6",
    border: "1 solid #e5e7eb",
  },

  pillNumber: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: OCEAN_DEEP,
  },

  pillLabel: {
    fontSize: 8,
    color: OCEAN_DEEP,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  /* TABLE */
  tableHeader: {
    flexDirection: "row",
    backgroundColor: OCEAN_DEEP,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginBottom: 2,
  },

  headerCell: {
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
  },

  rowEven: {
    backgroundColor: "#ffffff",
  },

  rowOdd: {
    backgroundColor: LIGHT_SAND,
  },

  cell: {
    paddingHorizontal: 4,
    fontSize: 11,
    color: OCEAN_DEEP,
  },

  roomCol: {
    width: "20%",
  },

  typeCol: {
    width: "50%",
  },

  statusCol: {
    width: "30%",
  },

  roomNumber: {
    fontFamily: "Helvetica-Bold",
    color: TEAL,
  },

  statusCellWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  badgeAvailable: {
    backgroundColor: "#e8f5f2",
  },

  badgeOccupied: {
    backgroundColor: "#fdecea",
  },

  badgeInactive: {
    backgroundColor: "#f3f4f6",
  },

  statusText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  textAvailable: {
    color: TEAL,
  },

  textOccupied: {
    color: CORAL,
  },

  textInactive: {
    color: GRAY,
  },

  /* FOOTER */
  footer: {
    position: "absolute",
    bottom: 32,
    left: 40,
    right: 40,
  },

  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  footerText: {
    fontSize: 8,
    color: GRAY,
  },
});