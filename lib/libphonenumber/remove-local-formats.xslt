<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml" indent="yes"/>

    <!--
        The purpose of this transform is to remove phone number formats that don't have an intlFormat.  Using the
        modified metadata result will keep the AsYouTypeFormatter from picking local formats as possibilities for the
        input being typed.  For example, in the US, a 7-digit format wouldn't be suggested.
    -->

    <!-- Identity Transform - this ends up removing the DTD, but we don't need it -->
    <xsl:template match="/ | @* | node()">
          <xsl:copy>
                <xsl:apply-templates select="@* | node()" />
          </xsl:copy>
    </xsl:template>

    <!-- Remove formats without an intlFormat provided there is at least one other applicable format. -->
    <xsl:template match="/phoneNumberMetadata/territories/territory/availableFormats/numberFormat[intlFormat='NA' and count(parent::node()/numberFormat[not(intlFormat='NA')])>0]" />

</xsl:stylesheet>