
/**
 * Neuron  Network
 * A neural network, which can be load from a 'weight' set.
 * It has a set of layer containing of the node.
 * The first layer is represented, but not used. (directly inputs)
 */
var NeuronNetwork = function()
{
	/** Initializer **/
	
	/**
	 * Create the neuron network going throug a 'Weight' object.
	 * You can also set the threshold of the neuron. Set null if you just want the system to used only the sum.
	 * The output will not be based on threshold (true result, for comparison).
	 */
	this.init = function( weightSet, threshold )
	{
		weights = weightSet;
	
		var layerNbr = weightSet.get_layer_nbr();
		var neuronNbr;
		
		layers = new Array(layerNbr);
		
		//Going throug available layer
		for(var i=0; i<layerNbr; i++)
		{
			//Create the layer
			layers[i] = new NeuronLayer();
			
			//Creating the neuronlist
			neuronNbr = weightSet.get_neuron_nbr(i);			
			var neuronList = new Array(neuronNbr);
			
			for(var j=0; j<neuronNbr; j++)
			{
				neuronList[j] = new Neuron();
				
				//Set the threshold if there is one and not for the last one
				if(threshold != null && i<layerNbr-1)
				{ neuronList[j].set_threshold( threshold ); }
				
				//console.log("NeuronNetwork creation: layer "+i+" adding "+ weightSet.get_weight(i,j));
				neuronList[j].init_weigh( weightSet.get_weight(i,j) );
				
			}
			
			//Init the layer
			layers[i].init_layer(neuronList);
		}
	}
	
	
	
	/** Attributes **/
	
	/**
	 * A list of layer.
	 * Created at initialization.
	 */
	 var layers;
	 
	/**
	 * The weight structure
	 */
	 var weights;
	 
	
	/** Methods **/
	
	/**
	 * Compute the result of the neural network from inputs
	 */
	this.compute_result = function( input )
	{
		//Cuurent data (output from the previous, input for then next)
		var prevOutput = input;
		
		//Transmitting the previous layer outpur as the input of the next level
		for(var i=1; i<layers.length; i++)
		{
			//console.log(prevOutput);
			prevOutput = layers[i].get_output(prevOutput);
		}
		
		return prevOutput;
	}
	
	/**
	 * Weight getter
	 */
	 this.get_weights = function()
	 {
		return weights;
	 }
}