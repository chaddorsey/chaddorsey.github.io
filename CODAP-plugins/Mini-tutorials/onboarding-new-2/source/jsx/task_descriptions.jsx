hasMouse = true;  // This is a kludge to prevent loading of Mammals on touch devices

taskDescriptions = {
  descriptions: [
    {
      key: 'CreateGraph', label: 'Create a graph.', url: './resources/CreateGraph.mp4',
      operation: 'create', type: 'graph',
      feedback: <div>
        <p>Great, you have a graph!  Now you can put an attribute on it.</p>
        <p>The data points are scattered because nothing has been added to the axes yet.</p>
      </div>
    },
    
    // Make specific to named attribute (and horizontal axis?)
    {
      key: 'AddDoctors', label: 'Drag "Total Count of Medical Doctors” onto the horizontal axis.',
      url: './resources/MakeScatterplot.mp4',
      operation: 'attributeChange', type: 'DG.GraphView',
      constraints: [{property: 'attributeName', value:'Total Count of Medical Doctors'}],
      requiresSpecialHandling: true,
      feedback: <div>
            <p>That’s a good start!  It’s possible to replace which attribute you’ve graphed on the axis, too.</p>
          </div>
    },
    
    // Make specific to named attribute (and axis / swap)
    {
      key: 'AddInternetUsers', label: 'Change the attribute by dragging “Internet Users” to the horizontal axis.', url: './resources/ChangeAttribute.mp4',
      operation: 'attributeChange', type:'DG.GraphView',
      //constraints: [{property: 'attributeName', value:'Internet Users'}],
      prereq: 'AddDoctors',
      feedback: <div>
        <p>Great work.  You can drag another attribute into the middle of the graph to get a sense of the relationship between the two attributes.</p>
      </div>,
      alt_feedback: <div>
        <p>Very nice graph!</p>
        <p>There are no points in it because you haven't yet dragged any
          data in yet.</p>
      </div>
    },
    {
    key: 'ChangeScale', label: 'Drag the horizontal axis to change the scale. (Can you spread the points out?)', url: './resources/ChangeScale.mp4',
      operation: 'change axis bounds', type: 'DG.GraphView',
      prereq: 'AddInternetUsers',
      feedback: <div>
        <p>Notice that you need to hover over the horizontal axis to get a right-facing hand to appear in order to expand the axis.  A left-facing or upward-facing hand will let you change the axis in different ways.  Changing the scale on an axis can allow you to zoom in on one part of the graph or to zoom out to get a view of all of the data points.  You can use this same tool on either the horizontal or vertical axis. Try it!</p>
      </div>
    },
    {
      key: 'MakeLegend', label:'Drag “Urban Living” to the middle of the graph to color the points in the graph.',
      url: './resources/MakeLegend.mp4',
      operation: 'legendAttributeChange', type: 'DG.GraphModel',
      requiresSpecialHandling: true,
      //constraints: [ {property: 'attributeName', value: 'Urban Living'}],
      prereq: 'AssignAttribute',
      feedback: <div>
        <p>Nice job. You’ll notice that the points are colored according to the values of “Urban Living.”</p>

        <p>Notice where the darker and lighter points are.  Are they clustered in any way? How do they relate to the values of “Internet Users?”?</p>
      </div>
    },

    // Make specific to graph title change (vs. table)
    {
      key: 'ChangeGraphTitle', label: 'Add a title to your graph!', url: './resources/AddTitle.mp4',
      operation: 'titleChange', type: '',
      //componentType: 'graph',
      //constraints: [ {property: 'to', value: 'NewTitle'}],
      requiresSpecialHandling: true,
      feedback: <div>
        <p>Nice work!  It’s a good idea to name your graphs so that you remember what attributes you put on the axes, in case you want to minimize the graph later.</p>
      </div>
    },
    {
      key: 'DrawTool', label: 'Open your graph in the Draw Tool.', url: './resources/DrawTool.mp4',
      operation: 'create game controller', type: 'DG.WebView',
      prereq: 'CreateGraph', 
      feedback: <div>
        <p>Great!  You can use this draw tool to add text to your graph or circle points you want to highlight, both of which could be very helpful in a presentation.</p>
        <p>This tool works with maps as well.</p>
      </div>
    }
  ],
  getFeedbackFor: function (iKey, iUseAltFeedback, iAllAccomplished) {
    let tDesc = this.descriptions.find(function (iDesc) {
      return iKey === iDesc.key;
    });
    let tFeedback = iUseAltFeedback ? tDesc.alt_feedback : tDesc.feedback;
    if( iAllAccomplished) {
      tFeedback = <div>
        { tFeedback }
        { allAccomplishedFeedback}
      </div>;
    }
    return tFeedback;
  },
  taskExists: function(iKey) {
    return this.descriptions.find( function(iDesc) {
      return iKey === iDesc.key;
    });
  }
};

allAccomplishedFeedback = <div>
  <p>Congratulations! You've done the following:</p>
  <ul>
    <li>Created a graph</li>
    <li>Graphed a numerical attribute onto the horizontal axis</li>
    <li>Changed the attribute graphed on the horizontal axis</li>
    <li>Colored the points in the graph</li>
    <li>Changed the scale on the horizontal axis</li>
    <li>Added a title to a graph</li>
    <li>Opened a graph in the Draw Tool</li>
  </ul>
  <p>You can do a <em>lot</em> with just those five skills!</p>
  <p>For more information about how to work with CODAP, visit
    the <a href="https://codap.concord.org/help/" target="_blank">CODAP Help</a> page. </p>
  <button onClick={() => window.parent.location.reload()}>Start Over</button>
</div>;

infoFeedback =
    <div>
      <p>This onboarding plugin for CODAP was created to help new CODAP users get started
        using CODAP. It lives in CODAP as an iFrame. Certain user actions cause CODAP to
        notify the plugin. The plugin responds by providing feedback to the user.</p>
      <p>The open source code is at<br/>
        <a href="https://github.com/concord-consortium/codap-data-interactives/tree/master/onboarding"
           target="_blank">
          CODAP's data interactive GitHub repository</a>. </p>
      <p>This plugin makes use of the CODAP data interactive plugin API whose documentation is at<br/>
        <a href="https://github.com/concord-consortium/codap/wiki/CODAP-Data-Interactive-Plugin-API"
           target="_blank">
          CODAP Data Interactive API</a>.</p>
    </div>;

    tracingFeedback =
    <div>
      <p>Here!</p>
    </div>;
