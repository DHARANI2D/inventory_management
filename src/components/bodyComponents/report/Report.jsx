import React, { Component } from "react";
import { Document, Page } from "react-pdf-js";
import { Button, Box, Typography } from "@mui/material";
import { saveAs } from "file-saver";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReportType: "sales",
      reportData: null,
      loading: false,
    };
  }

  handleReportTypeChange = (event) => {
    this.setState({
      selectedReportType: event.target.value,
    });
  };

  generateReport = () => {
    // Simulate API call to fetch report data
    this.setState({ loading: true });
    // You would replace this with an actual API call
    setTimeout(() => {
      const simulatedData = this.getSimulatedData();
      this.setState({
        reportData: simulatedData,
        loading: false,
      });
    }, 1000); // Simulating a delay for the API call
  };

  generatePDF = () => {
    const { selectedReportType, reportData } = this.state;

    const content = reportData.map((item, index) => (
      <Box key={index} sx={{ mt: 2 }}>
        <strong>{item.product}</strong>:{" "}
        {selectedReportType === "sales" ? item.sales : item.stock}
      </Box>
    ));

    const pdfContent = (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">
          {selectedReportType === "sales" ? "Sales" : "Inventory"} Report
        </Typography>
        {content}
      </Box>
    );

    const pdfBlob = new Blob([pdfContent], { type: "application/pdf" });

    saveAs(pdfBlob, `${selectedReportType}_report.pdf`);
  };

  getSimulatedData = () => {
    if (this.state.selectedReportType === "sales") {
      return [
        { product: "Product A", sales: 100 },
        { product: "Product B", sales: 150 },
        { product: "Product C", sales: 80 },
      ];
    } else if (this.state.selectedReportType === "inventory") {
      return [
        { product: "Product A", stock: 200 },
        { product: "Product B", stock: 120 },
        { product: "Product C", stock: 300 },
      ];
    }
    return null;
  };

  render() {
    const { selectedReportType, reportData, loading } = this.state;

    return (
      <Box sx={{ p: 3, mx: 3 }}>
        <Typography variant="h4">Inventory Management Report</Typography>
        <label htmlFor="reportType" sx={{ mt: 2, mr: 2 }}>
          Select Report Type:
        </label>
        <select
          id="reportType"
          onChange={this.handleReportTypeChange}
          value={selectedReportType}
          sx={{ mt: 2, mr: 2 }}
        >
          <option value="sales">Sales Report</option>
          <option value="inventory">Inventory Report</option>
        </select>
        <Button onClick={this.generateReport} disabled={loading} sx={{ mt: 2 }}>
          {loading ? "Generating Report..." : "Generate Report"}
        </Button>

        {reportData && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5">
              {selectedReportType === "sales" ? "Sales" : "Inventory"} Report
            </Typography>
            {reportData.map((item, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <strong>{item.product}</strong>:{" "}
                {selectedReportType === "sales" ? item.sales : item.stock}
              </Box>
            ))}
          </Box>
        )}

        <Button
          onClick={this.generatePDF}
          disabled={!reportData || loading}
          sx={{ mt: 2 }}
        >
          Generate PDF
        </Button>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5">Additional Information</Typography>
          {/* Add any additional information or features relevant to the reports */}
        </Box>
      </Box>
    );
  }
}

export default Report;
