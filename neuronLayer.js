
/**
 * Neuron layer
 * A set of neuron which take an input array (prvious array) and give an output.
 */ 
 var NeuronLayer = function()
 {
	/** Initializer **/
	
	/**
	 * Initialize a layer from an array of neurons
	 */
	this.init_layer = function(neuronsList)
	{
		neurons = neuronsList;
	}
	
	/** Attributes **/
	
	/**
	 * Set of neurons
	 */
	var neurons;
	
	
	/** Methods **/
	
	/**
	 * Return the output of that layer by calling the get output of its neurons
	 */
	this.get_output = function(input)
	{
		//List of output of that layer (output of each neuron in taht layer)
		var output = new Array(neurons.length);
		
		for(var i=0; i < neurons.length; i++)
		{
			output[i] = neurons[i].get_output(input); 
		}
		
		return output;
	}
 }