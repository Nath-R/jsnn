
/**
 * Weight
 * Deals with the generation and saving of several levels of weights for a neural network.
 */
var Weight = function()
{
	/** Initializer **/
	
	/**
	 * Create weights for then neural networks matching the data.
	 * @param layerDataArray And array containing the number of neuron for each level (0=input level)
	 */
	this.init_random = function(layerDataArray)
	{
		weights = new Array(layerDataArray.length-1);
	
		//Go trhoug the COUPLE of layer
		for(var i=0; i<layerDataArray.length-1; i++ )
		{
			weights[i] = new Array(layerDataArray[i+1]);
		
			//We fill the previous weight for a layer (layer-1)
			for(var j=0; j<layerDataArray[i+1]; j++ )
			{
				weights[i][j] = new Array(layerDataArray[i]);
			
				//Adding as link as there is previous neuron in the previous layer
				for(var k=0; k<layerDataArray[i]; k++ )
				{
					weights[i][j][k] = Math.random()*2 - 1; //Between -1 and 1
				}
			}
		}
	}
	
	/**
	 * Unserialize data from a string
	 * @param string String with the following structure:  w111 w112; w121 w122 \n w211 w212; w221 w222 \n...
	 */
	this.init_string = function(string)
	{
		layersStr = string.split("\n");
		weights = new Array(layersStr.length -1); // not -1, last \n ignored
	
		//Go trhoug the COUPLE of layer
		for(var i=0; i<layersStr.length -1; i++ )
		{
			neuronStr = layersStr[i].split(";");			
			weights[i] = new Array(neuronStr.length -1); //-1 to ignore the last ;
		
			//We fill the previous weight for a layer (layer-1)
			for(var j=0; j<neuronStr.length -1; j++ )
			{
				linkStr = neuronStr[j].split(" ");
				weights[i][j] = new Array(linkStr.length -1); //-1 to ignore the last space
			
				//Adding as link as there is previous neuron in the previous layer
				for(var k=0; k<linkStr.length -1; k++ )
				{
					weights[i][j][k] = (linkStr[k]);
				}
			}
		}
	}
	
	/**
	 * Unserialize data from a string, but may change the value to evolve !
	 * @param string String with the following structure:  w111 w112; w121 w122 \n w211 w212; w221 w222 \n...
	 * @param threshold Probability to get a new value
	 */
	this.init_evolve = function(string, threshold)
	{
		layersStr = string.split("\n");
		weights = new Array(layersStr.length -1); // not -1, last \n ignored
	
		//Go trhoug the COUPLE of layer
		for(var i=0; i<layersStr.length -1; i++ )
		{
			neuronStr = layersStr[i].split(";");
			weights[i] = new Array(neuronStr.length -1); //-1 to ignore the last ;
		
			//We fill the previous weight for a layer (layer-1)
			for(var j=0; j<neuronStr.length -1; j++ )
			{
				linkStr = neuronStr[j].split(" ");
				weights[i][j] = new Array(linkStr.length -1); //-1 to ignore the last space
			
				//Adding as link as there is previous neuron in the previous layer
				for(var k=0; k<linkStr.length -1; k++ )
				{
					if( Math.random() < threshold )
					{ weights[i][j][k] =  Math.random()*2 - 1;}
					else
					{ weights[i][j][k] = (linkStr[k]); }
					
				}
			}
		}
	}
	
	/**
	 * Unserialize from two string. It merges the two weights with a chance for 0.5 for each !
	 */
	this.init_merge = function(string1, string2)
	{
		layersStr1 = string1.split("\n");
		layersStr2 = string2.split("\n");
		
		//Check if same size !
		if( layersStr1.length != layersStr2.length )
		{
			console.log("Merge impossible: size of the two NN different: "+layersStr1.length+" and"+ layersStr2.length);
		}
		
		weights = new Array(layersStr1.length -1); // not -1, last \n ignored
	
		//Go trhoug the COUPLE of layer
		for(var i=0; i<layersStr1.length -1; i++ )
		{
			neuronStr1 = layersStr1[i].split(";");
			neuronStr2 = layersStr2[i].split(";");
			weights[i] = new Array(neuronStr1.length -1); //-1 to ignore the last ;
		
			//We fill the previous weight for a layer (layer-1)
			for(var j=0; j<neuronStr1.length -1; j++ )
			{
				linkStr1 = neuronStr1[j].split(" ");
				linkStr2 = neuronStr2[j].split(" ");
				weights[i][j] = new Array(linkStr1.length -1); //-1 to ignore the last space
			
				//Adding as link as there is previous neuron in the previous layer
				for(var k=0; k<linkStr1.length -1; k++ )
				{
					if( Math.random() < 0.5 )
					{ weights[i][j][k] = (linkStr2[k]); }
					else
					{ weights[i][j][k] = (linkStr1[k]); }
					
				}
			}
		}
	}
	
	
	/** Attributes **/
	
	/**
	 * Triple dimension array containing each weight for the neural network (for each neuron: layer->neuron->link to the previous level)
	 * 0 is weight for link betwenn level 0 and level 1 of the neural networks, for the level 1 layer (the one after the inputs)
	 * Be aware of the shift !
	 * It is really created in the initializer
	 */
	 var weights;
	
	/** Methods **/
	
	/**
	 * Get the array of weight for the wanted neuron at the wanted level  (layer-1 to match our array)
	 */
	this.get_weight = function(layer, neuron)
	{
		if( layer <= 0 || layer > weights.length )
		{ return null; }
		else
		{
			pos = layer - 1;
			if( neuron < 0 || neuron > weights[pos].length )
			{ return null; }
			else
			{ return weights[pos][neuron]; }
		}
	}
	
	/**
	 * Return the total number of layer in that 'Weight'
	 */
	this.get_layer_nbr = function()
	{
		return weights.length + 1;
	}
	
	/**
	 * Return the number of neuron for a given layer
	 */
	 this.get_neuron_nbr = function( layer )
	 {
		if( layer <= 0 || layer > weights.length )
		{ return null; }
		else
		{ 
			pos = layer - 1;
			return weights[pos].length; 
		}
	 }
	
	/**
	 * Serialize the array as a string
	 */
	 this.serialize = function()
	 {
		var ser = "";
		//Layer
		for( var i=0; i<weights.length; i++)
		{
			//Neuron
			for( var j=0; j<weights[i].length; j++)
			{
				//Link
				for( var k=0; k<weights[i][j].length; k++)
				{
					ser += weights[i][j][k]+" ";
				}
				
				ser += ";"; //Separator betwwen neuron
			}
			
			ser += "\n"; //separator between layer
		}
		
		return ser;
	 }
}